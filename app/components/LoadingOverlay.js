import { Controller, createFunctionalComponent, DataProxy, computable } from 'cx/ui';
import { Button, Icon, PureContainer, Text } from 'cx/widgets';
import { uid } from 'uid';
import { isFunction } from 'cx/util';
import { EventEmitter } from '../util/EventEmitter';
import { withCancelablePromise } from '../util/withRaceControl';
import { showErrorToast } from '../util/toasts';

let eventEmitters = new Map();
class LoadingOverlayEmitter extends EventEmitter {
   fire(...args) {
      // this helps avoid the bug that occurs when the event is fired before the LoadingOverlay has been initialized
      // this occurs when the controller is initialized before the LoadingOverlay itself (controller is in a parent element)
      setTimeout(() => super.fire(...args), 0);
   }
}

function getEventEmitter(name) {
   let eventEmitter = eventEmitters.get(name) || new LoadingOverlayEmitter();
   if (!eventEmitters.has(name)) eventEmitters.set(name, eventEmitter);
   return eventEmitter;
}

function getLoadingOverlayController(name, toast) {
   let eventEmitter;
   let tasks = new Map();

   return class extends Controller {
      onInit() {
         if (name) {
            eventEmitter = getEventEmitter(name);
         }
         if (!eventEmitter) return;
         this.subs = [
            eventEmitter.on('startLoading', (id) => this.startLoading(id)),
            eventEmitter.on('endLoading', (id) => this.endLoading(id)),
            eventEmitter.on('error', (err, id) => this.error(err, id)),
         ];
      }

      onDestroy() {
         if (this.subs) this.subs.forEach((unsub) => unsub());
         // if (eventEmitter) {
         // in case there are multiple LoadingOverlays with the same name,
         // check if eventEmitter is active (there are other LoadingOverlays that are still using it) before removing it
         // if (eventEmitter.isActive())
         //     return;
         // eventEmitters.delete(name);
         // console.log(eventEmitters.keys())
         // }
      }

      startLoading(id) {
         this.store.update('$status', (status) => {
            if (tasks.size === 0) return 'loading';
            return status === 'error' ? status : 'loading';
         });
         tasks.set(id, true);
      }

      endLoading(id) {
         tasks.delete(id);
         this.store.update('$status', (status) => {
            if (status != 'error' && tasks.size === 0) return 'ok';
            return status;
         });
      }

      error(err, id) {
         tasks.delete(id);
         // we are now propagating the error further anyway, so no need to log it here
         // console.error(err);
         // if request aborted, do nothing
         if (err.name === 'AbortError') return;
         if (toast) {
            showErrorToast(err);
            this.store.set('$status', 'ok');
         } else {
            this.store.set('$status', 'error');
            this.store.set('$error', err.message || err);
         }
      }

      onCancel() {
         this.store.set('$status', 'ok');
      }

      onRetry() {
         eventEmitter && eventEmitter.fire('retry');
         if (onRetry) this.invokeParentMethod(onRetry);
      }
   };
}

export const LoadingOverlay = createFunctionalComponent(
   ({
      name,
      status,
      // keeps loading overlay mask visible for testing purposes
      loading,
      onRetry,
      children,
      icon = 'fa-spinner-third',
      loadingText = '',
      error,
      errorMessage,
      style,
      mod,
      iconMod,
      suspenseTimeout = 5000,
      toast = true,
      // force the mask display, used for testing
      showMask,
   }) => {
      const LoadingController = getLoadingOverlayController(name, toast);

      return (
         <cx>
            <DataProxy
               data={{
                  $status: status,
                  $loading: loading,
                  $error: errorMessage || error,
               }}
            >
               <PureContainer controller={LoadingController}>
                  {/* <Suspense loading-expr="{$loading} || {$status} == 'loading'" timeout={suspenseTimeout}> */}
                  {children}
                  {/* </Suspense> */}
                  <div class="cxb-loading-overlay-container" mod={mod} if-expr="{$status} == 'error'">
                     <div class="cxe-loading-overlay-error">
                        <Text value-bind="$error" />
                        <div class="error-buttons">
                           <Button
                              onClick="onCancel"
                              text={Boolean(onRetry) ? 'Cancel' : 'Dismiss'}
                              style="margin: 0 10px 0 0;"
                              // mod={mod == 'dark' ? 'hollow-light' : ''}
                              mod="hollow-error"
                              icon="fa-times-circle"
                           />
                           <Button
                              // mod={mod === 'dark' ? 'accent' : 'primary'}
                              mod="secondary"
                              onClick="onRetry"
                              if={Boolean(onRetry)}
                              text="Retry"
                              icon="fa-sync"
                           />
                        </div>
                     </div>
                  </div>
                  <div
                     if-expr="{$status} != 'error'"
                     visible={computable('$status', (status) => {
                        if (status != 'error' || showMask) return true;
                        return false;
                     })}
                     mod={mod}
                     class={{
                        'cxb-loading-overlay-container': true,
                        'cxs-animated': true,
                        //"on": {expr: "{$loading} || {$status} == 'loading'"}
                        on: computable('$loading', '$status', (loading, status) => {
                           return loading || status == 'loading' || showMask;
                        }),
                     }}
                     style={style}
                  >
                     <div class="cxe-loading-overlay-indicator">
                        <Icon
                           name={icon}
                           style={
                              {
                                 // width: '24px',
                                 // height: '24px'
                              }
                           }
                           mod={iconMod}
                           class="margin-right-5x"
                        />
                        <span text={loadingText} />
                     </div>
                  </div>
               </PureContainer>
            </DataProxy>
         </cx>
      );
   }
);

function isClass(v) {
   return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}

export function withLoadingOverlay(name, Controller) {
   // if (name == 'pending-timeline') debugger;
   if (typeof name != 'string') {
      [Controller, name] = [name, Controller];
   }

   // this function is executed on every controller initialization (but only for functional controllers!) and provice an isolated
   // requests map for each instance (solves the Vault lock/unlock reload bug)
   function getIsolatedWithLoading() {
      let withLoading;
      let requests = new Map();

      if (name) {
         withLoading = async function (promise) {
            let eventEmitter = getEventEmitter(name);
            let requestId = uid();
            try {
               eventEmitter.fire('startLoading', requestId);
               let [cancelablePromise, cancel] = withCancelablePromise(promise);
               requests.set(requestId, cancel);
               let res = await cancelablePromise;
               eventEmitter.fire('endLoading', requestId);
               return res;
            } catch (err) {
               eventEmitter.fire('error', err, requestId);
               throw err;
            } finally {
               requests.delete(requestId);
            }
         };
      } else {
         withLoading = async function (promise) {
            let requestId = uid();
            try {
               this.invokeParentMethod('startLoading', requestId);
            } catch (err) {
               console.error(err);
               console.error(`LoadingOverlay is not initialized.
                        Make sure there is a LoadingOverlay parent component or set a LoadingOverlay name attribute.`);
            }

            try {
               let [cancelablePromise, cancel] = withCancelablePromise(promise);
               requests.set(requestId, cancel);
               let res = await cancelablePromise;
               this.invokeParentMethod('endLoading', requestId);
               return res;
            } catch (err) {
               this.invokeParentMethod('error', err, requestId);
               throw err;
            } finally {
               requests.delete(requestId);
            }
         };
      }

      function cancelAllRequests() {
         for (let cancel of requests.values()) {
            cancel();
         }
      }

      return {
         withLoading,
         cancelAllRequests,
      };
   }

   if (isClass(Controller)) {
      throw Error('Controller class syntax causes errors after transpilation/bundling, use object syntax instead.');
   } else if (isFunction(Controller)) {
      return function (...args) {
         let { withLoading, cancelAllRequests } = getIsolatedWithLoading();
         let config = Controller(...args);
         return {
            ...config,
            withLoading,
            onDestroy() {
               cancelAllRequests();
               config.onDestroy && config.onDestroy();
            },
         };
      };
   } else {
      let { withLoading, cancelAllRequests } = getIsolatedWithLoading();
      return {
         ...Controller,
         withLoading,
         onDestroy() {
            cancelAllRequests();
            Controller.onDestroy && Controller.onDestroy.call(this);
         },
      };
   }
}

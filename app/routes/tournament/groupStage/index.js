import { computable, createFunctionalComponent, PureContainer, Repeater, Restate } from 'cx/ui';
import { Button, Grid } from 'cx/widgets';
import { getGroupColumns } from './columns';
import Controller from './Controller';

export default createFunctionalComponent(({ groups, groupMatches }) => {
   return (
      <cx>
         <Restate
            data={{
               groups,
               groupMatches,
            }}
            controller={Controller}
         >
            <div class="width-half flex-column gap-2x">
               <Repeater records-bind="groupsArray" recordAlias="$group">
                  <div>
                     <Grid
                        class="m-4 mb border-2 border-solid border-sky-500"
                        records-expr="Object.values({$group})"
                        columns={getGroupColumns()}
                        /* columnParams={}*/
                        //onGetColumns={getGroupColumns()}
                        headerMode="plain"
                        clearableSort
                     />
                     <Button class="mb-8" text="click me baby" onClik="showGroupMatches" />
                  </div>
               </Repeater>
            </div>

            <div class="flex-column gap-2x width-half">
               <Repeater records-bind="selectedGroup" recordAlias="$group">
                  <Grid
                     records-expr="Object.values({$group})"
                     columns={getGroupColumns()}
                     /* columnParams={}*/
                     //onGetColumns={getGroupColumns()}
                     headerMode="plain"
                     clearableSort
                  />
               </Repeater>
            </div>
         </Restate>
      </cx>
   );
});

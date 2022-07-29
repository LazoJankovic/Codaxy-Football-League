import { computable, createFunctionalComponent, PureContainer, Repeater, Restate } from 'cx/ui';
import { Button, Grid, NumberField } from 'cx/widgets';
import { getGroupColumns } from './columns';
import Controller from './Controller';
import groupLetters from '../../../util/tournament/groupLetters';

export default createFunctionalComponent(({ groups, groupMatches }) => {
   let groupLetters = 'ABCDEFGH';
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
                  <Grid
                     class="m-4 mb border-2 border-solid border-sky-500"
                     records-expr="Object.values({$group})"
                     columns={getGroupColumns()}
                     /* columnParams={}*/
                     //onGetColumns={getGroupColumns()}
                     headerMode="plain"
                     clearableSort
                  />
                  <Button
                     class="mb-8"
                     text="click me baby"
                     onClick={(e, { store }) => {
                        let index = store.get('$index');
                        let selectedGroup = store.get('groupMatches')[groupLetters[index]];
                        store.set('selectedGroup', selectedGroup);
                     }}
                  />
               </Repeater>
            </div>

            <div class="flex-column gap-2x width-half">
               <Repeater records-bind="selectedGroup" recordAlias="$round">
                  <ul>
                     <Repeater records-bind="$round" recordAlias="$match">
                        <li>
                           <span text-expr="{$match}[0]" />
                           <NumberField mode="view" />
                           <NumberField mode="view" />
                           <span text-expr="{$match}[1]" />
                        </li>
                     </Repeater>
                  </ul>
               </Repeater>
            </div>
         </Restate>
      </cx>
   );
});

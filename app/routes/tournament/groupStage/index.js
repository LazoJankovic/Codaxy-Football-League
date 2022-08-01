import { createFunctionalComponent, expr, Repeater, Restate } from 'cx/ui';
import { Button, Grid, NumberField } from 'cx/widgets';
import { getGroupColumns, getGroupMatches } from './columns';
import Controller from './Controller';

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

            <div class="matchweektable flex-column gap-2x">
               <Repeater records-bind="selectedGroup" recordAlias="$round" indexAlias="$mw">
                  <Grid records-bind="$round" recordAlias="$match" columns={getGroupMatches()} />
               </Repeater>
            </div>
         </Restate>
      </cx>
   );
});

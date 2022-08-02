import { computable, expr } from 'cx/ui';
import { Button, NumberField } from 'cx/widgets';

export const getGroupColumns = () => {
   let columns = [
      {
         //field: 'position',
         header: { text: '#' },
         //class: '!pl-0',
         sortable: true,
      },
      {
         field: 'playerName',
         header: { text: 'Player', class: '' },
         //class: '!pl-0',
      },
      {
         field: 'playedGames',
         header: 'PG',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'wins',
         header: 'W',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'draws',
         header: 'D',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'losses',
         header: 'L',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'goalsScored',
         header: 'gs',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'goalsConceded',
         header: 'gc',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'points',
         header: 'Pts',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      /*  {
           field: 'percent',
           header: 'Percentage',
           format: 'p;1',
           align: 'right',
        },
        {
           field: 'percent',
           header: '',
           children: (
              <cx>
                 <div
                    class="bg-green-600 h-2"
                    style={{
                       width: computable('$record.percent', (percent) => percent * 400),
                    }}
                 />
              </cx>
           ),
        },*/
   ];

   return columns;
};

export let getGroupMatches = () => {
   let columns = [
      {
         field: '0',
         header: {
            text: expr('"Round "  + {$mw}'),
            align: 'left',
         },
         align: 'right',
      },
      {
         field: '2',
         align: 'right',
         width: 100,
         //className: 'overflow-hidden',
         items: (
            <cx>
               <NumberField
                  class="w-fit"
                  mode-expr='{$match}[4] ? "edit" : "view" '
                  emptyText="__"
                  value={{
                     expr: '{$match}[2]',
                     set: (value, { store }) => {
                        let match = store.get('$match');
                        match[2] = value;
                        store.set('$match', [...match]);
                     },
                  }}
               />
            </cx>
         ),
      },

      {
         header: 'Result',
         align: 'center',
         width: 100,
         items: (
            <cx>
               {/* temp */}
               <Button
                  onClick={(e, { store, controller }) => {
                     return controller.editResult(store);
                  }}
                  icon-expr='{$match}[4] ? "check" : "pencil"'
                  tooltip={{
                     placement: 'up',
                     text: expr('{$match}[4] ? "Save" : "Edit result"'),
                  }}
                  mod="hollow"
               />
            </cx>
         ),
      },
      {
         field: '3',
         align: 'left',
         width: 100,
         items: (
            <cx>
               <NumberField
                  class="w-fit"
                  mode-expr='{$match}[4] ? "edit" : "view" '
                  emptyText="__"
                  //value-expr="{$match}[3]"
                  /* value={computable('$match', (match) => {
                     return match[3];
                  })} */
                  value={{
                     expr: '{$match}[3]',
                     set: (value, { store }) => {
                        let match = store.get('$match');
                        match[3] = value;
                        store.set('$match', [...match]);
                     },
                  }}
               />
            </cx>
         ),
      },
      {
         field: '1',
         align: 'left',
      },
   ];
   return columns;
};

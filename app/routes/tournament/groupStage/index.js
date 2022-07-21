import { computable, createFunctionalComponent, Repeater, Restate } from 'cx/ui';
import { Grid } from 'cx/widgets';
import Controller from './Controller';

export default createFunctionalComponent(({ groups }) => {
   return (
      <cx>
         <Restate
            data={{
               groups,
            }}
            controller={Controller}
         >
            <div>
               <Repeater records="groupsArray" recordAlias="$group">
                  <Grid
                     class="grow"
                     records-bind="$group"
                     headerMode="plain"
                     columns={[
                        {
                           field: 'name',
                           header: { text: 'Product', class: 'pl-0' },
                           class: '!pl-0',
                           sortable: true,
                        },
                        {
                           field: 'sales',
                           header: 'Sales',
                           format: 'currency;EUR;0',
                           align: 'right',
                           sortable: true,
                        },
                        {
                           field: 'percent',
                           header: 'Percentage',
                           format: 'p;1',
                           align: 'right',
                           sortable: true,
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
                        },
                     ]}
                  />
               </Repeater>
            </div>
         </Restate>
      </cx>
   );
});

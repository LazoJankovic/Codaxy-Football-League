import { computable, FirstVisibleChildLayout, Format, PureContainer } from 'cx/ui';
import { Button, DateField, LookupField, NumberField, TextField } from 'cx/widgets';

export const getColumns = (showDynamicInfo) => {
   let config = {
      ...c('playerName', {
         header: 'Player name',
         items: (
            <cx>
               <TextField
                  value-bind="$record.playerName"
                  style="width: 200px"
                  required
                  // disabled={computable('gridData', (data) => data && data.some((r) => r.$editing && !r.$editing.add))}
               />
            </cx>
         ),
      }),
      ...c('clubName', {
         header: 'Club name',
         items: (
            <cx>
               <TextField
                  value-bind="$record.clubName"
                  style="width: 200px"
                  required
                  // disabled={computable('gridData', (data) => data && data.some((r) => r.$editing && !r.$editing.add))}
               />
            </cx>
         ),
      }),
      ...c('emblemPictureURL', {
         header: 'Club emblem',
         items: (
            <cx>
               <TextField
                  style="width:200px"
                  placeholder="give me picture url form the internet"
                  value-bind="$record.emblemPictureURL"
               />
            </cx>
         ),
         align: 'right',
      }),
      /* row_expander: {
         header: '',
         field: 'row_expander',
         align: 'center',
         width: 40,
         items: (
            <cx>
               <Button
                  mod="hollow"
                  class="row-expander"
                  icon-expr="{$record.expandRow} ? 'fa-chevron-down' : 'fa-chevron-right'"
                  onClick="expandRow"
               />
            </cx>
         ),
         visible: showDynamicInfo,
      }, */
   };

   for (let key in config) {
      let { width, header, ...rest } = config[key];
      config[key] = {
         field: key,
         header: {
            text: header,
         },
         sortable: true,
         style: {
            width: width,
            minWidth: width,
            maxWidth: width,
         },
         class: 'ellipsis',
         ...rest,
      };
   }
   let columns = Object.keys(config).map((c) => ({
      ...config[c],
   }));
   return columns;
};

function c(field, config) {
   var obj = {};
   obj[field] = {
      ...config,
   };
   return obj;
}

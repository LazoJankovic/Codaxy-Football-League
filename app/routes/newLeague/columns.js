import { computable, FirstVisibleChildLayout, Format, PureContainer } from 'cx/ui';
import { Button, DateField, LookupField, NumberField, TextField } from 'cx/widgets';

export const getColumns = (showDynamicInfo) => {
   let config = {
      row_expander: {
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
      },
      ...c('player_name', {
         items: (
            <cx>
               <TextField
                  value-bind="$record.player_name"
                  style="width: 200px"
                  // disabled={computable('gridData', (data) => data && data.some((r) => r.$editing && !r.$editing.add))}
               />
            </cx>
         ),
      }),
      ...c('club', {
         items: (
            <cx>
               <TextField
                  value-bind="$record.club_name"
                  style="width: 200px"
                  // disabled={computable('gridData', (data) => data && data.some((r) => r.$editing && !r.$editing.add))}
               />
            </cx>
         ),
      }),
      ...c('picture_url', {
         items: (
            <cx>
               <TextField
                  style="width:200px"
                  placeholder="give me picture url form the internet"
                  text-bind="$record.picture_url"
               />
            </cx>
         ),
         align: 'right',
      }),
   };

   for (let key in config) {
      let { width, ...rest } = config[key];

      config[key] = {
         field: key,
         header: {
            text: /*  t(key) *|*/ key, ///
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

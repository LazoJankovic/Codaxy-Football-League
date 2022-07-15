import { KeySelection } from 'cx/ui';
import { Button, Rescope, TextField } from 'cx/widgets';
import { RowEditableGrid } from '../../components/RowEditableGrid';
import Controller from './Controller';
import { getColumns } from './columns';

export default (
   <cx>
      <Rescope>
         <div controller={Controller}>
            Hello from Cx CLI!
            <Button text="get test" onClick="apiTest" />
            <Button text="post test" onClick="postTest" />
            <div class="m-auto">
               <TextField
                  class="m-auto"
                  baseClass="border-b-2"
                  placeholder="Enter name of your league"
                  value-bind="leagueName"
               />
            </div>
            <div class="toolbar gap-2x">
               <Button text="ui_add_fee" onClick="addRow" icon="fa-plus" mod="hollow" />
               <Button
                  text="ui_edit_details"
                  mod="hollow"
                  icon="fa-edit"
                  onClick="showRecordDetails"
                  /*  disabled={computable('gridData', 'selection', (gridData, selection) => {
                     if (!gridData || !selection) return true;

                     let record = gridData.find((r) => r.id === selection);
                     let feeModelEditable =
                        record &&
                        record.mnd_fee_structure_enabled_fee_model_parameters &&
                        record.mnd_fee_structure_enabled_fee_model_parameters.length;
                     return !isUserAdminOrHasPermission('MandateModify') || !feeModelEditable;
                  })} */
               />
               <Button
                  text="ui_remove"
                  onClick="removeFeeStructure"
                  icon="fa-trash"
                  mod="hollow"
                  confirm={{
                     message: 'ui_fin_mnd_fee_structures_delete_msg',
                     yesText: 'ui_remove',
                     noText: 'ui_cancel',
                     noButtonMod: 'secondary',
                  }}
               />
               <Button icon="fa-sync" mod="hollow" class="place-right" onClick="loadData" tooltip="ui_refresh" />
            </div>
            <RowEditableGrid
               ///style={style}
               scrollable
               records-bind="gridData"
               emptyText={/* errorMessage ||  */ 'general_empty_message'}
               selection={{
                  type: KeySelection,
                  bind: 'selection',
               }}
               mod={{
                  '': true, ///
                  'empty-warning': true,
                  condensed: true,
               }}
               columns={getColumns(true)} ///
               row={{
                  mod: { expr: "!!{$record.$editing} ? 'edit-row' : null" },
                  line3: {
                     visible: { expr: '{$record.expandRow}' },
                     columns: [
                        {
                           colSpan: 1000,
                           style: 'border-top-color: rgba(0, 0, 0, 0.05)',
                           items: (
                              <cx>
                                 <div style="width: 250px;">
                                    <div class="listitem small flex-row">
                                       <div class="listitem_label" text="mnd_fee_structure_current_fee_amount_gross" />
                                       <div
                                          class="listitem_value place-right"
                                          text-tpl="{$record.mnd_fee_structure_current_fee_amount_gross:n;2}"
                                       />
                                    </div>
                                    <div class="listitem small flex-row">
                                       <div class="listitem_label" text="mnd_fee_structure_current_fee_amount" />
                                       <div
                                          class="listitem_value place-right"
                                          text-tpl="{$record.mnd_fee_structure_current_fee_amount:n;2}"
                                       />
                                    </div>
                                    <div class="listitem small flex-row">
                                       <div
                                          class="listitem_label"
                                          text="mnd_fee_structure_current_fee_applied_percent"
                                       />
                                       <div
                                          class="listitem_value place-right"
                                          text-tpl="{$record.mnd_fee_structure_current_fee_applied_percent:n;2}"
                                       />
                                    </div>
                                 </div>
                              </cx>
                           ),
                        },
                     ],
                  },
               }}
               onSave="updateRow"
               border={false}
               ///disableEditing={!isUserAdminOrHasPermission('MandateModify')}
            />
         </div>
      </Rescope>
   </cx>
);

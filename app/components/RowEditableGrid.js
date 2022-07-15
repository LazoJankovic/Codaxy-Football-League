import { updateArray } from 'cx/data';
import { computable, createFunctionalComponent } from 'cx/ui';
import { closestParent, isFocusable, isFunction, isString, KeyCode } from 'cx/util';
import { Button, FlexRow, Grid } from 'cx/widgets';
import { RowEditorFloater } from './RowEditorFloater';

const revertFocusToGrid = (e) => {
   let focusableParent = closestParent(e.target, isFocusable);
   if (focusableParent)
      setTimeout(() => {
         focusableParent.focus();
      }, 0);
};

const createRowEditorCallbacks = ({ records, onSave, onDelete, onEdit, onCancel, isRowEditable }) => ({
   editRow(e, instance) {
      let { store, controller } = instance;

      let record = store.get('$record');
      if (isFunction(isRowEditable) && !isRowEditable(record)) {
         return;
      }

      if (record.$editing) return;

      if (records && records.bind) {
         store.update(
            records.bind,
            updateArray,
            (a) => ({ ...a, $editing: null }),
            (a) => !!a.$editing,
            (a) => a.add
         );
      }

      if (isString(onEdit)) controller[onEdit](record, instance);
      //keep old values
      else store.set('$record.$editing', record);
   },

   saveRow(e, instance) {
      let { store, controller } = instance;
      store.delete('$record.$editing');
      let data = store.get('$record');
      if (isString(onSave)) controller.invokeMethod(onSave, data, instance);
      else onSave(data, instance);

      revertFocusToGrid(e);
   },

   cancelRowEditing(e, instance) {
      let { store, controller } = instance;
      let record = store.get('$record');
      let oldRecord = store.get('$record.$editing');

      if (isString(onCancel)) controller[onCancel](oldRecord, instance);
      else if (record.$editing.add) store.delete('$record');
      else store.set('$record', oldRecord);

      revertFocusToGrid(e);
   },

   deleteRow(e, instance) {
      let { store, controller } = instance;
      let data = store.get('$record');
      if (isString(onDelete)) controller[onDelete](data, instance);
      else onDelete(data, instance);
   },
});

export const RowEditButtons = createFunctionalComponent((props) => {
   let { editRow, saveRow, cancelRowEditing, deleteRow } = createRowEditorCallbacks(props);

   let {
      onSave,
      onDelete,
      onEdit,
      onCancel,
      deleteDisabled,
      editDisabled,
      confirmDeleteMessage,
      hideCancel,
      isRowEditable,
      onlyInlineEdit,
   } = props;

   return (
      <cx>
         <FlexRow justify={!!onDelete ? 'center' : 'end'} class="grid_actionbuttons" visible={!onlyInlineEdit}>
            <Button
               mod="hollow"
               disabled={editDisabled}
               onClick={editRow}
               visible={computable(
                  '$record',
                  (rec) => !rec.$editing && (!isFunction(isRowEditable) || isRowEditable(rec))
               )}
               icon="fa-money-check-edit"
               tooltip={'ui_edit'}
            />

            <Button
               mod="hollow"
               onClick={deleteRow}
               disabled={deleteDisabled}
               visible-expr={`${!!onDelete} && !{$record.$editing}`}
               confirm={
                  confirmDeleteMessage || {
                     message: 'ui_delete_confirm_single',
                     yesText: 'ui_delete',
                     noText: 'ui_cancel',
                     noButtonMod: 'secondary',
                  }
               }
               icon="fa-trash"
               tooltip={'ui_delete'}
            />
         </FlexRow>
         <RowEditorFloater visible-expr="!!{$record.$editing}" autoFocusFirstField>
            <Button
               mod="secondary"
               onClick={cancelRowEditing}
               visible-expr="!!{$record.$editing}"
               visible={computable('$record.$editing', (editing) => {
                  return !hideCancel && !!editing;
               })}
               icon="fa-times-circle"
               // tooltip={'ui_cancel_editing')}
               text={'ui_cancel'}
               class="margin-right"
            />
            <Button
               onClick={saveRow}
               mod="primary"
               disabled-bind="$record.invalid"
               visible-expr="!!{$record.$editing}"
               icon="fa-save"
               // tooltip={'ui_save')}
               text="Save"
            />
         </RowEditorFloater>
      </cx>
   );
});

export const RowEditableGrid = createFunctionalComponent(({ showActions = true, ...props }) => {
   let { onEdit, onSave, onCancel, onDelete, onRowClick, disableEditing, isRowEditable, onlyInlineEdit } = props;
   let { editRow, saveRow, cancelRowEditing } = createRowEditorCallbacks(props);

   let columns = showActions
      ? [
           ...props.columns,
           {
              items: (
                 <cx>
                    <RowEditButtons
                       onSave={onSave}
                       onCancel={onCancel}
                       onEdit={onEdit}
                       onDelete={onDelete}
                       isRowEditable={isRowEditable}
                       onlyInlineEdit={onlyInlineEdit}
                    />
                 </cx>
              ),
              style: onlyInlineEdit ? 'width: 0px' : 'width: 120px;',
              class: 'padding-vertical-none',
           },
        ]
      : props.columns;

   let gridProps = disableEditing
      ? props
      : {
           row: {
              mod: { expr: "!!{$record.$editing} ? 'edit-row' : null" },
           },
           ...props,
           onRowKeyDown: (e, instance) => {
              let { store } = instance;
              let oldRecord = store.get('$record.$editing');
              if (e.keyCode == KeyCode.esc && oldRecord) {
                 cancelRowEditing(e, instance);
                 e.stopPropagation();
                 return false;
              }

              if (e.keyCode != KeyCode.enter) return;

              //save
              if (oldRecord) {
                 saveRow(e, instance);
                 e.stopPropagation();
                 return false;
              } else {
                 let nowEditing = props.records.bind && store.get(props.records.bind).some((r) => r.$editing);
                 if (instance.selected || nowEditing) {
                    editRow(e, instance);
                    e.stopPropagation();
                    return false;
                 }
              }
           },
           onRowClick: (e, instance) => {
              let { store } = instance;
              if (props.records.bind) {
                 let records = store.get(props.records.bind);
                 let record = store.get('$record');
                 if (records.some((r) => r.$editing && r != record)) editRow(e, instance);
              }

              if (onRowClick) {
                 if (isString(onRowClick)) {
                    let { controller } = instance;
                    controller[onRowClick](e, instance);
                 } else onRowClick(e, instance);
              }
           },
           onRowDoubleClick: editRow,
           columns,
        };

   return (
      <cx>
         <Grid {...gridProps} />
      </cx>
   );
});

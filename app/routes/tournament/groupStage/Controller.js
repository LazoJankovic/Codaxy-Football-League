import { convertToGroupsArray } from '../../../util/tournament/groupFunctions';
import { useStore } from 'cx/hooks';
export default {
   onInit() {
      this.addTrigger(
         'groups',
         ['groups'],
         (groups) => {
            this.store.set('groupsArray', convertToGroupsArray(groups));
         },
         true
      );
   },

   editResult(store) {
      let match = store.get('$match');
      if (match[4]) {
         match.splice(4, 1);
         store.set('$match', [...match]);
         // return this.saveResult();
      }
      match[4] = 'editing';
      store.set('$match', [...match]);
   },

   /*  async saveResult() {
      try {
         const { data, error } = await supabase
            .from('Codaxy Tournament')
            .update({ GroupStage: 'otherValue' })
            .eq('some_column', 'someValue');
      } catch {}
   }, */
};

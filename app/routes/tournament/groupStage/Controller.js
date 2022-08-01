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
      debugger;
      if (match[4]) {
         match.splice(4, 1);
         return store.set('$match', [...match]);
      }
      match[4] = 'editing';
      store.set('$match', [...match]);
   },
};

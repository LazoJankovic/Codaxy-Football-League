import { convertToGroupsArray } from '../../../util/tournament/groupFunctions';

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

      //let groupLetters = Object.keys(groups);
   },
};

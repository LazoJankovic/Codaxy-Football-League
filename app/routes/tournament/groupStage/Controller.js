import { convertToGroupsArray } from '../../../util/tournament/convertToGroupsArray';

export default {
   onInit() {
      let groups = this.store.get('groups');
      //this.store.set('groupsArray', convertToGroupsArray(groups));
      //let groupLetters = Object.keys(groups);
   },
};

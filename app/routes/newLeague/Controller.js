//import { supabase } from '../../supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';
import { leagueTemplate } from '../../util/newLeagueTemplate';

export default {
   onInit() {
      //this.store.set('league', []);
      console.log(leagueTemplate);
      this.store.set('gridData', [
         {
            player_name: '',
            club_name: '',
            picture_url: '',
         },
      ]);
   },

   async apiTest() {
      let all = await supabase.from('Liga').select('*');
      console.log(all);
      let { data: Liga, error } = await supabase.from('Liga').select('*');

      console.table(Liga);
      console.log('apiTest');
   },

   async postTest() {
      /* let { data: Liga, error: getError } = await supabase.from('Liga').select('*');
      debugger;
      return; */
      let { player_name, club_name, picture_url } = this.store.get('gridData')[0];

      const { data, error } = await supabase.from('Liga').insert([
         { ime_kluba: club_name, ime_igraca: player_name },
         //{ ime_kluba: 'Omladinac', ime_igraca: 'Boban' },
      ]);
      console.log(data, error);
   },
   expandRow(e, { store }) {
      store.toggle('$record.expandRow', true);
   },
   addRow() {
      this.store.update('gridData', (records) => [
         {
            $editing: { add: true },
         },
         ...records,
      ]);
   },
};

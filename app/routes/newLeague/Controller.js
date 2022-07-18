//import { supabase } from '../../supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';
import { leagueTemplate } from '../../util/newLeagueTemplate';
import { setupGroupStage } from '../../util/tournament/tournamentDraw';

export default {
   onInit() {
      //this.store.set('league', []);
      console.log(leagueTemplate);
      this.store.set('gridData', [
         {
            playerName: 'Milutin',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Milivoje',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         },
         {
            playerName: 'Jevrosim',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Sanchez',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
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
      let playersData = this.store.get('gridData');
      let groupStage = setupGroupStage(playersData);
      this.store.set('groupStage', groupStage);

      /*  const { data, error } = await supabase.from('Codaxy Tournament').insert([
         { 'Group stage': groupStageTest },
         //{ ime_kluba: 'Omladinac', ime_igraca: 'Boban' },
      ]);
      console.log(data, error); */
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

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
         /* {
            playerName: 'Sanchez',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
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
            playerName: 'Pero',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Djuro',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Marko',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         },
         {
            playerName: 'Sasa',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Bobo',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Hugo',
            clubName: 'Treasure Hunters',
            emblemPictureURL: 'chest',
         },
         {
            playerName: 'Nebojsa',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Vedran',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Ogi Jr.',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         },
         {
            playerName: 'Ogi Sr.',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Njegos',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Danijela',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Stefan',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         },
         {
            playerName: 'Stijak',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Zrna',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Bodo',
            clubName: 'Treasure Hunters',
            emblemPictureURL: 'chest',
         }, 
         {
            playerName: 'Simic',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Goran',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Jovica',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         }, */
         {
            playerName: 'Timi',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Sladakovic',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },
         {
            playerName: 'Djuka',
            clubName: 'Novi grad',
            emblemPictureURL: 'slika',
         },
         {
            playerName: 'Milic',
            clubName: 'Novi Sad',
            emblemPictureURL: 'slicica',
         },
         {
            playerName: 'Malina',
            clubName: 'Kolubara',
            emblemPictureURL: 'ikona',
         },
         {
            playerName: 'Bobo',
            clubName: 'Monterey',
            emblemPictureURL: 'painto',
         },

         {
            playerName: 'Pamela',
            clubName: 'Treasure Hunters',
            emblemPictureURL: 'chest',
         },
         {
            playerName: 'Jessica',
            clubName: 'Treasure Hunters',
            emblemPictureURL: 'chest',
         },
         {
            playerName: 'Ava',
            clubName: 'Treasure Hunters',
            emblemPictureURL: 'chest',
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
      console.log(groupStage);
      let players = 0;
      for (let key in groupStage) {
         let ingroups = 0;
         for (let group in groupStage[key]) {
            players++;
            ingroups++;
         }
         console.log(ingroups);
      }
      console.log(players);
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

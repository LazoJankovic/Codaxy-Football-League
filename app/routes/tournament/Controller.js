import { History } from 'cx/ui';
import { getTournament } from '../../api/tournament';
import { withLoadingOverlay } from '../../components/LoadingOverlay';
import { supabase } from '../../supabaseClient';
import getUrlParams from '../../util/getUrlParams';
import { showErrorToast } from '../../util/toasts';

/* return withLoadingOverlay('mandates-list', () => ({
   onInit() {
 */
export default () => {
   return withLoadingOverlay('tournaments', () => ({
      onInit() {
         this.addTrigger(
            'tournamentChange',
            ['url'],
            (url) => {
               if (!url) return;
               let { tournamentId } = getUrlParams(url);
               if (!tournamentId) return;
               this.loadTournamentData(tournamentId);
               //History.replaceState({}, null, `~/tournament`);
            },
            true
         );
      },

      async loadTournamentData(id) {
         try {
            let tournamentId = parseInt(id);
            let { data, error } = await this.withLoading(getTournament(tournamentId));
            if (error) throw error;
            this.store.set('selectedTournament', data[0]);
         } catch (error) {
            console.log(error);
            showErrorToast(error.message);
         }
      },
   }));
};

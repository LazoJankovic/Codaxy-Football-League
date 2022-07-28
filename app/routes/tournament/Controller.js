import { History } from 'cx/ui';
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
               this.loadTournament(tournamentId);
               //History.replaceState({}, null, `~/tournament`);
            },
            true
         );
      },

      async loadTournament(id) {
         try {
            let tournamentId = parseInt(id);
            let { data, error } = await this.withLoading(
               supabase.from('Codaxy Tournament').select('*').eq('id', tournamentId)
            );
            if (error) throw error;
            this.store.set('selectedTournament', data[0]);
         } catch (error) {
            console.log(error);
            showErrorToast(error.message);
         }
      },
   }));
};

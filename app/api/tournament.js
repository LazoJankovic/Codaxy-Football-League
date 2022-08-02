import { supabase } from '../supabaseClient';
import { showErrorToast } from '../util/toasts';

const dataTable = 'Codaxy Tournament';

//dataTable columns
const TOURNAMENT_NAME = 'TournamentName';
const GROUP_STAGE = 'GroupStage';
const GROUP_MATCHES = 'GroupMatches';
const KNOCKOUT_STAGE = 'KnockoutStage';
const KNOCKOUT_MATCHES = 'KnockoutMatches';

export async function addTournament(tournamentName, groupStage, groupStageMatches) {
   let response = await supabase
      .from(dataTable)
      .insert([{ [TOURNAMENT_NAME]: tournamentName, [GROUP_STAGE]: groupStage, [GROUP_MATCHES]: groupStageMatches }]);
   return response;
}

export async function getTournaments() {
   try {
      let { data, error } = await supabase.from(dataTable).select(`id,${TOURNAMENT_NAME}`);
      if (error) throw error;
      return data;
   } catch (error) {
      console.log(error);
      showErrorToast(error.message);
   }
}

export async function getTournament(id) {
   let response = await supabase.from(dataTable).select('*').eq('id', id);
   return response;
}

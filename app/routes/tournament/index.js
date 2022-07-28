import { LoadingOverlay } from '../../components/LoadingOverlay';
import getController from './Controller';
import GroupStage from './groupStage';
import KnockoutStage from './knockoutStage';

export default () => (
   <cx>
      <LoadingOverlay
         status-bind="status"
         name="tournaments"
         controller={getController()}
         class="league_container flex flex-row "
      >
         {/* @TODO: fix this */}
         <div visible-bind="selectedTournament" class="flex-row gap">
            <GroupStage
               groups-bind="selectedTournament.GroupStage"
               groupMatches-bind="selectedTournament.GroupMatches"
            />
            <KnockoutStage visible={false} />
         </div>
      </LoadingOverlay>
   </cx>
);

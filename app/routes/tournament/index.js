import getController from './Controller';
import GroupStage from './groupStage';
import KnockoutStage from './knockoutStage';

export default () => (
   <cx>
      <div controller={getController()} class="league_container flex flex-row ">
         <GroupStage groups-bind="selectedTournament.GroupStage" />
         <KnockoutStage />
      </div>
   </cx>
);

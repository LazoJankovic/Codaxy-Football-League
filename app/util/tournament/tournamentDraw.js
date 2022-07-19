import { isUndefined } from 'cx/util';

export function setupGroupStage(playersData) {
   let numberOfTeams = playersData.length;
   let spillover = numberOfTeams % 4;
   let groupStage = {};
   let players = playersData;

   return setupAlgorithm(spillover, numberOfTeams);

   function setupAlgorithm(spillover, numOfTeams) {
      if (spillover == 0) {
         switch (numOfTeams) {
            case 4:
            case 8:
            case 28:
               createGroups(0, 4);
               return groupStage;
            default:
               createGroups(0, numOfTeams / 4);
               return groupStage;
         }
      }

      switch (numOfTeams) {
         case 5:
            groupStage['A'] = addPlayersToGroup(0, 5);
            break;
         case 9:
            groupStage['A'] = addPlayersToGroup(0, 5);
            groupStage['B'] = addPlayersToGroup(5, 4);
            break;
         case 13:
            groupStage['A'] = addPlayersToGroup(0, 4);
            createGroups(4, 3);
            break;
         case 17:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(5, 4);
            break;
         case 21:
            groupStage['A'] = addPlayersToGroup(0, 6);
            createGroups(6, 5);
            break;
         case 25:
            createGroups(0, 5);
            break;
         case 29:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(5, 6);
            break;

         //spillover 2
         case 6:
         case 10:
            createGroups(0, numOfTeams / 2);
            break;
         case 14:
            groupStage['A'] = addPlayersToGroup(0, 4);
            createGroups(4, 5);
            break;
         case 18:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(0, 3);
            break;
         case 14:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(0, 3);
            break;
      }
      /* if (spillover == 0) {
         switch (numberOfTeams) {
            case 4:
            case 8:
            case 28:
               createGroups(0, 4);
               break;
            default:
               createGroups(0, numberOfTeams / 4);
               break;
         }
      }

      if (spillover == 1) {
         switch (numberOfTeams) {
            case 5:
               groupStage['A'] = addPlayersToGroup(0, 5);
               break;
            case 9:
               groupStage['A'] = addPlayersToGroup(0, 5);
               groupStage['B'] = addPlayersToGroup(5, 4);
               break;
            case 13:
               groupStage['A'] = addPlayersToGroup(0, 4);
               createGroups(4, 3);
               break;
            case 17:
               groupStage['A'] = addPlayersToGroup(0, 5);
               createGroups(5, 4);
               break;
            case 21:
               groupStage['A'] = addPlayersToGroup(0, 6);
               createGroups(6, 5);
               break;
            case 25:
               createGroups(0, 5);
               break;
            case 29:
               groupStage['A'] = addPlayersToGroup(0, 5);
               createGroups(5, 6);
               break;
         }
      }

      if (spillover == 2) {
         groupStage['A'] = addPlayersToGroup(0, 3);
         groupStage['B'] = addPlayersToGroup(3, 3);
      }

      if (spillover == 3) {
         groupStage['A'] = addPlayersToGroup(0, 4);
         groupStage['B'] = addPlayersToGroup(4, 3);
      }

      return groupStage; */
   }

   function createGroups(startingIndex, numOfPlayers) {
      const groups = 'ABCDEFGH';
      debugger;
      for (let group of groups) {
         if (!isUndefined(groupStage[group])) continue;
         if (startingIndex >= numberOfTeams) break;
         groupStage[group] = addPlayersToGroup(startingIndex, numOfPlayers);
         startingIndex += numOfPlayers;
      }
   }

   function addPlayersToGroup(startingIndex, numOfPlayers) {
      let groupPlayers = {};

      for (let i = startingIndex; i < startingIndex + numOfPlayers; i++) {
         groupPlayers[players[i].playerName] = {
            ...playerDataTemplate,
            club: players[i].clubName,
            emblemPictureURL: players[i].emblemPictureURL,
         };
      }
      return groupPlayers;
   }
}

let playerDataTemplate = {
   club: '',
   emblemPictureURL: '',
   wins: 0,
   draws: 0,
   losses: 0,
   goalsScored: 0,
   goalsConceded: 0,
};

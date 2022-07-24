import { isUndefined } from 'cx/util';
import robin from 'roundrobin';

export function setupGroupStage(playersData) {
   let numberOfTeams = playersData.length;
   let remainder = numberOfTeams % 4;
   let groupStage = {};
   let players = playersData;

   return setupAlgorithm(numberOfTeams);

   function setupAlgorithm(numOfTeams) {
      if (remainder == 0) {
         switch (numOfTeams) {
            case 4:
            case 8:
            case 28:
            case 32:
               createGroups(0, 4);
               return groupStage;
            default:
               createGroups(0, numOfTeams / 4);
               return groupStage;
         }
      }

      if (numOfTeams % 5 == 0) createGroups(0, 5);

      switch (numOfTeams) {
         case 6:
         case 9:
            createGroups(0, 3);
            break;

         case 7:
         case 11:
            groupStage['A'] = addPlayersToGroup(0, 3);
            createGroups(3, 4);
            break;

         case 13:
         case 17:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(5, 4);
            break;

         case 14:
         case 19:
            groupStage['A'] = addPlayersToGroup(0, 4);
            createGroups(4, 5);
            break;

         case 18:
            createGroups(0, 6);
            break;

         case 21:
         case 26:
         case 31:
            groupStage['A'] = addPlayersToGroup(0, 6);
            createGroups(6, 5);
            break;

         case 22:
            groupStage['A'] = addPlayersToGroup(0, 5);
            groupStage['B'] = addPlayersToGroup(5, 5);
            createGroups(10, 6);
            break;

         case 23:
         case 29:
            groupStage['A'] = addPlayersToGroup(0, 5);
            createGroups(5, 6);
            break;

         case 27:
            groupStage['A'] = addPlayersToGroup(0, 6);
            groupStage['B'] = addPlayersToGroup(6, 6);
            createGroups(12, 5);
            break;
      }
      return groupStage;
   }

   function createGroups(startingIndex, numOfPlayers) {
      const groups = 'ABCDEFGH';
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

export function createGroupStageSchedule(groups) {
   let groupMatches = { ...groups };
   for (let group in groups) {
      let groupPlayers = Object.keys(groups[group]);
      const groupSize = groupPlayers.length;
      groupMatches[group] = robin(groupSize, groupPlayers);
   }
   return groupMatches;
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


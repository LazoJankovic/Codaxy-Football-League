export function setupGroupStage(playersData) {
   let numberOfTeams = playersData.length;
   let spillover = numberOfTeams % 4;
   return setupAlgorithm(spillover, numberOfTeams, playersData);
}

function setupAlgorithm(spillover, numberOfTeams, playersData) {
   const letters = 'ABCDEFGHIJKLMNOP';
   let groupStage = {};

   if (spillover == 0) {
      let startingIndex = 0;
      for (let group of letters) {
         if (startingIndex >= numberOfTeams) break;
         groupStage[group] = addPlayersToGroup(startingIndex, playersData);
         startingIndex += 4;
      }
      return groupStage;
   }
}

function addPlayersToGroup(startingIndex, playersData) {
   let groupPlayers = {};

   for (let i = startingIndex; i < startingIndex + 4; i++) {
      groupPlayers[playersData[i].playerName] = {
         ...playerDataTemplate,
         club: playersData[i].clubName,
         emblemPictureURL: playersData[i].emblemPictureURL,
      };
   }
   return groupPlayers;
}

let groupStageTest = {
   A: {
      players: {
         Marko: {
            club: ' ',
            wins: 5,
         },
      },
      schedule: [['lfc', 'bvb', 2, 1], []],
   },
   B: {},
};

let playerDataTemplate = {
   club: '',
   emblemPictureURL: '',
   wins: 0,
   draws: 0,
   losses: 0,
   goalsScored: 0,
   goalsConceded: 0,
};

export class leagueTemplate {
   leagueName: string = '';
   players: Player[] = [];
   schedule?: any;
}

export interface Player {
   playerName: string;
   clubName: string;
   emblem: string;
   wins: number;
   draws: number;
   losses: number;
   goalsScored: number;
   goalsConceded: number;
   points: number;
}

export type matchweek = [][];

/* let leagueTemplate: leagueTemplate = {
   leagueName: '',
   players: [
      {
         playerName: '',
         clubName: '',
         emblem: '',
         wins: 0,
         draws: 0,
         losses: 0,
         goalsScored: 0,
         goalsConceded: 0,
         points: 0,
      },
   ],
   schedule: {},
}; */

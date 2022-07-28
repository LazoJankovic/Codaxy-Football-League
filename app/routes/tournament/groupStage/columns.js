export const getGroupColumns = () => {
   let columns = [
      {
         //field: 'position',
         header: { text: '#' },
         //class: '!pl-0',
         sortable: true,
      },
      {
         field: 'playerName',
         header: { text: 'Player', class: '' },
         //class: '!pl-0',
      },
      {
         field: 'playedGames',
         header: 'PG',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'wins',
         header: 'W',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'draws',
         header: 'D',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'losses',
         header: 'L',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'goalsScored',
         header: 'gs',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'goalsConceded',
         header: 'gc',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      {
         field: 'points',
         header: 'Pts',
         //format: 'currency;EUR;0',
         align: 'right',
      },
      /*  {
           field: 'percent',
           header: 'Percentage',
           format: 'p;1',
           align: 'right',
        },
        {
           field: 'percent',
           header: '',
           children: (
              <cx>
                 <div
                    class="bg-green-600 h-2"
                    style={{
                       width: computable('$record.percent', (percent) => percent * 400),
                    }}
                 />
              </cx>
           ),
        },*/
   ];

   return columns;
};

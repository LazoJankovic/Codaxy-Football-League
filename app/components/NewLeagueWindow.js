export const NewLeagueWindow = ({}) => {
   return new Promise((resolve) => {
      let WidgetController = withLoadingOverlay('new-league-window', {
         onInit() {},
      });

      let w = Window.create({
         title: 'Create new league',
         style: 'width: 520px; height: 66vh',
         center: true,
         modal: true,
         onDestroy: () => resolve(false),
         items: <cx></cx>,
      });

      w.open();
   });
};

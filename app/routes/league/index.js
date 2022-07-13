import Controller from './Controller';
import Results from './Results';
import Standings from './Standings';

export default () => (
   <cx>
      <div controller={Controller} class="league_container flex flex-row ">
         <Standings />
         <Results />
      </div>
   </cx>
);

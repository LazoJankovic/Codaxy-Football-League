import { Button } from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <div controller={Controller}>
         Hello from Cx CLI!
         <Button text="test" onClick="apiTest" />
      </div>
   </cx>
);

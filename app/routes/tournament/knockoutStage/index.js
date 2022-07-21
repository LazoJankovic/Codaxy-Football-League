import { Repeater } from 'cx/ui';

export default () => (
   <cx>
      <div class="flex flex-col grow">
         <Repeater records={[{ a: 'a' }, { b: 'b' }]}>
            <p> test</p>
         </Repeater>
      </div>
   </cx>
);

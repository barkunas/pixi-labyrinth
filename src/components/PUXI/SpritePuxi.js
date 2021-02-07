import { CustomPIXIComponent } from "react-pixi-fiber";

import {Text} from '@puxi/core/lib/puxi-core.js'

console.log(Text)


const TYPE = "SpritePuxi";
export const behavior = {

  customDisplayObject: props => new Text({
    value: "Click me!"
  }),
  customApplyProps: function (instance, oldProps, newProps) {
    console.log('PUXI')
    console.log(instance)
  }
};
export default CustomPIXIComponent(behavior, TYPE);
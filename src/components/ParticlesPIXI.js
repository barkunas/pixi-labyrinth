import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import * as particles from 'pixi-particles'

import coinSprite from '../img/coin.png'

const TYPE = "ParticlesPIXI";
export const behavior = {
  customDisplayObject: props => '',
  customApplyProps: function (instance, oldProps, newProps) {
    console.log(instance)
  }
};
export default CustomPIXIComponent(behavior, TYPE);
import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "AnimatedSprite";
export const behavior = {
  customDisplayObject: props => new PIXI.AnimatedSprite(props.texture),
  customApplyProps: function (instance, oldProps, newProps) {
    console.log(instance)
    instance.animationSpeed = newProps.animationSpeed || 0.3
    instance.x = newProps.x || 0
    instance.y = newProps.y || 0
    instance.play()
  }
};
export default CustomPIXIComponent(behavior, TYPE);
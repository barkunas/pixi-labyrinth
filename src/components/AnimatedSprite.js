import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import * as particles from 'pixi-particles'

import coinSprite from '../img/coin.png'
import particlesConfig from '../common/coinParticlesConfig.json'

const TYPE = "AnimatedSprite";
export const behavior = {
  customDisplayObject: props => new PIXI.AnimatedSprite(props.texture),
  customApplyProps: function (instance, oldProps, newProps) {
    console.log(instance)
    instance.animationSpeed = newProps.animationSpeed || 0.3
    instance.x = newProps.x || 0
    instance.y = newProps.y || 0
    instance.play()
    const stage = newProps.app.stage
    let emitter = new particles.Emitter(
      stage,

      // The collection of particle images to use
      [PIXI.Texture.from(coinSprite)],
      particlesConfig
    )
    emitter.resetPositionTracking()
    var position = instance.getGlobalPosition()
    emitter.updateOwnerPos(position.x,position.y)
    console.log('object');
    console.log(instance.getGlobalPosition())
    var elapsed = Date.now();
    // Update function every frame
    var update = function () {
      // Update the next frame
      requestAnimationFrame(update);
      var now = Date.now();
      // The emitter requires the elapsed
      // number of seconds since the last update
      emitter.update((now - elapsed) * 0.001);
      elapsed = now;
      // Should re-render the PIXI Stage
      // renderer.render(stage);
    };
    // Start emitting
    emitter.emit = true;
    // Start the update
    update();
  }
};
export default CustomPIXIComponent(behavior, TYPE);
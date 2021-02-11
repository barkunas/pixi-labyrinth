import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import * as particles from 'pixi-particles'

const TYPE = "ParticlesPIXI";
export const behavior = {
  customDisplayObject: props => new particles.Emitter(
    props.stage,
    // The collection of particle images to use
    [PIXI.Texture.from(props.sprite)],
    props.particlesConfig
  ),
  customApplyProps: function (emitter, oldProps, newProps) {
    //console.log(instance)
    
    emitter.resetPositionTracking()
    emitter.updateOwnerPos(newProps.x,newProps.y)
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
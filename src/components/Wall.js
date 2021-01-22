import React, {  PureComponent } from 'react'
import { Container, Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import wallSprite from '../img/wall.png'
import { BLOCK_WIDTH, BLOCK_HEIGHT } from '../appConfig'

/* 
props:{
    relativeSize:[[1,1]]
} 
*/
const wallPIXITexture = PIXI.Texture.from(wallSprite)

class Wall extends PureComponent {
    static props = {
        relativeSize: [[1]]
    }
    render() {
        let wallsBlock = []
        this.props.relativeSize.forEach((wallsArrayX, y) => {
            let wallsLine = []
            wallsArrayX.forEach((wall, x) => {
                if (wall == 1) {
                    let sprite = <Sprite type={wall} key={''+x+y} ref={this.props.addWall}name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={wallPIXITexture} />
                    wallsLine.push(sprite)
                }
                if (wall==3){
                    let sprite = <Sprite type={wall} key={''+x+y} ref={this.props.addWall}name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={wallPIXITexture} />
                    wallsLine.push(sprite)
                }
            })
            wallsBlock.push(<Container key={y} y={BLOCK_HEIGHT * y}>{wallsLine}</Container>)
        });
        return (
            <Container>
                {wallsBlock}
            </Container>

        )
    }
}

export default Wall

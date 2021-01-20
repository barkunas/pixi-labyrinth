import React, { Component, PureComponent } from 'react'
import { Container, Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import wallSprite from '../img/wall.png'
import { BLOCK_WIDTH,BLOCK_HEIGHT } from '../appConfig'

/* 
props:{
    relativeSize:[[1,1]]
} 
*/

class Wall extends PureComponent {
    static props = {
        relativeSize:[[1]]
    }
    render() {
        let wallsBlock = []
        this.props.relativeSize.map((wallsArrayX, y) => {
            let wallsLine = []
            wallsArrayX.forEach((wall, x) => {
                if (wall==1) {
                    let sprite = <Sprite x={BLOCK_WIDTH*x} y={0} texture={PIXI.Texture.from(wallSprite)} />
                    wallsLine.push(sprite)
                }
            })
            wallsBlock.push(<Container y={BLOCK_HEIGHT*y}>{wallsLine}</Container>)
        });
        return (
            <Container>
                {wallsBlock}
            </Container>

        )
    }
}

export default Wall

import React, { Component, PureComponent } from 'react'
import { Container, Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import wallSprite from '../img/bgtile.png'
import { BLOCK_WIDTH, BLOCK_HEIGHT } from '../appConfig'

const wallPIXITexture = PIXI.Texture.from(wallSprite)

class Wall extends PureComponent {
    static props = {
        maze: [[1]]
    }
    render() {
        console.log('walls render')
        let wallsBlock = []
        this.props.maze.forEach((wallsArrayX, y) => {
            let wallsLine = []
            wallsArrayX.forEach((wall, x) => {
                if (wall == 1 || wall == 4) {
                    let sprite = <Sprite type={wall} key={'' + x + y} name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={wallPIXITexture} />
                    wallsLine.push(sprite)
                }
                if (wall == 3) {
                    let sprite = <Sprite type={wall} key={'' + x + y} name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={wallPIXITexture} />
                    wallsLine.push(sprite)
                }
            })
            wallsBlock.push(<Container key={y} y={BLOCK_HEIGHT * y}>{wallsLine}</Container>)
        });
        return (
            <Container name={'wallsContainer'}>
                {wallsBlock}
            </Container>

        )
    }
}

export default Wall

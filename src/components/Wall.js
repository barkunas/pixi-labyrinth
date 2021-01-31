import React, { Component, PureComponent } from 'react'
import { Container, Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import wallSprite from '../img/bgtile.png'
import finishSprite from '../img/finish.png'
import startSprite from '../img/start.png'
import { BLOCK_WIDTH, BLOCK_HEIGHT, _PATH, _START, _WALL, _FINISH } from '../appConfig'

const wallPIXITexture = PIXI.Texture.from(wallSprite)
const finishPIXITexture = PIXI.Texture.from(finishSprite)
const startPIXITExture = PIXI.Texture.from(startSprite)

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
                let sprite
                switch (wall) {
                    case _WALL:
                        sprite = <Sprite type={wall} key={'' + x + y} name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={wallPIXITexture} />
                        wallsLine.push(sprite)
                        break;
                    case _START:
                        sprite = <Sprite type={wall} key={'' + x + y} name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={startPIXITExture} />
                        wallsLine.push(sprite)
                        break;
                    case _FINISH:
                        sprite = <Sprite type={wall} key={'' + x + y} name="spr_wall" x={BLOCK_WIDTH * x} y={0} texture={finishPIXITexture} />
                        wallsLine.push(sprite)
                        break;
                    default:
                        break;
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

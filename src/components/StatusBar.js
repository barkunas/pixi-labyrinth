import React, { PureComponent } from 'react'
import { Container, Text,Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import { APP_WIDTH } from '../appConfig'
import ribbonSprite from '../img/ribbon.png'

const ribbonPIXITexture = PIXI.Texture.from(ribbonSprite)
const ribbonPIXITextureW = ribbonPIXITexture.width

export default class StatusBar extends PureComponent {
    render() {
        console.log('render statusBar')
        return (
            <Container x={APP_WIDTH/2} y={0} renderId={'statusPanel'}>
                <Sprite texture={ribbonPIXITexture} x={ribbonPIXITextureW/-2} ref={(e)=>console.log(e)}>
                    <Text text={`Level: ${this.props.userLevel}`} />
                </Sprite>
                <Text text={`Coins: ${this.props.coinsBalance}`} y={40} />
            </Container>
        )
    }
}

import React, { Component } from 'react'
import { Container } from 'react-pixi-fiber'
import { APP_HEIGHT, FIRST_LEVEL_WALLS } from '../appConfig'
import Wall from './Wall'

class GameField extends Component {
    getWallsBounds = (ref) => {
        let bounds = ref.getBounds()
        ref.setTransform(0, APP_HEIGHT - bounds.height)
        console.log(ref)
    }
    render() {
        return (
            <Container ref={this.getWallsBounds}>
                <Wall relativeSize={FIRST_LEVEL_WALLS} />
            </Container>
        )
    }
}

export default GameField

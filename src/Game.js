import React, { Component } from 'react'
import { Container } from 'react-pixi-fiber'
import User from './components/User'

export class Game extends Component {
    render() {
        return (
            <Container
                containsPoint={() => true}
                interactive={true}
                mousedown={(e) => console.log(e.data.global)}>
                <User />
            </Container>
        )
    }
}

export default Game

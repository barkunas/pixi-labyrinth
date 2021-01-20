import React, { Component } from 'react'
import { Container } from 'react-pixi-fiber'
import Wall from './Wall'

class GameField extends Component {
    render() {
        return (
            <Container>
                <Wall relativeSize={[[1,1],[1,0,1]]}/>
            </Container>
        )
    }
}

export default GameField

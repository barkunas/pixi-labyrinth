import React, { Component } from 'react'
import { Container } from 'react-pixi-fiber'
import { APP_HEIGHT, APP_WIDTH } from './appConfig'
import GameField from './components/GameField'
import User from './components/User'

export class Game extends Component {
    state = {
        isMoveActive: false,
        runDirection: 0
    }
    mouseDownHandler = (e) => {
        console.log(e.data.global)
    }
    pointerdownHandler = (e) => {
        let realX = e.data.global.x
        let realY = e.data.global.y
        let centerPointX = APP_WIDTH / 2;
        let centerPointY = APP_HEIGHT / 2
        let relativeX = realX - centerPointX
        let relativeY = (realY - centerPointY) * -1
        let direction = Math.atan2(relativeX,relativeY)
        //if (direction < 0) { direction += 360 }
        this.setState({ runDirection: direction,isMoveActive: true })
    }
    pointerupHandler = () => {
        this.setState({ isMoveActive: false })
    }
    pointerupoutsideHandler = () => {
        this.setState({ isMoveActive: false })
    }
    pointermoveHandler = (e) => {
        if (!this.state.isMoveActive) { return }
        let realX = e.data.global.x
        let realY = e.data.global.y
        let centerPointX = APP_WIDTH / 2;
        let centerPointY = APP_HEIGHT / 2
        let relativeX = realX - centerPointX
        let relativeY = (realY - centerPointY) * -1
        let direction = Math.atan2(relativeX,relativeY)
        this.setState({ runDirection: direction })
    }
    render() {
        return (
            <Container
                containsPoint={() => true}
                interactive={true}
                pointerdown={this.pointerdownHandler}
                pointerup={this.pointerupHandler}
                pointerupoutside={this.pointerupoutsideHandler}
                pointermove={this.pointermoveHandler}
            >
                <User />
                <GameField isMoveActive={this.state.isMoveActive} runDirection={this.state.runDirection} />
            </Container>
        )
    }
}

export default Game

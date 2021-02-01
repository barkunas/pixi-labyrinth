import React, { Component } from 'react'
import { Container, Text } from 'react-pixi-fiber'
import { APP_HEIGHT, APP_WIDTH } from './appConfig'
import getNewLevelConfig from './common/levelGenerator'
import GameField from './components/GameField'
import User from './components/User'

export class Game extends Component {
    startLevel = 1
    state = {
        isMoveActive: false,
        runDirection: 0,
        userLevel: this.startLevel,
        levelConfig: this.generateNewLevel(this.startLevel)
    }
    mouseDownHandler = (e) => {
        console.log(e.data.global)
    }
    nextUserLevel = () => {
        this.setState({ levelConfig: this.generateNewLevel(this.state.userLevel + 1), userLevel: this.state.userLevel + 1 })
    }
    generateNewLevel(userLevel) {
        let levelWidth = userLevel + 5;
        let levelHeight = userLevel + 5
        var levelobj = getNewLevelConfig(levelHeight, levelWidth)
        console.log(levelobj)
        return levelobj
    }
    pointerdownHandler = (e) => {
        let realX = e.data.global.x
        let realY = e.data.global.y
        let centerPointX = APP_WIDTH / 2;
        let centerPointY = APP_HEIGHT / 2
        let relativeX = realX - centerPointX
        let relativeY = (realY - centerPointY) * -1
        let direction = Math.atan2(relativeX, relativeY)
        //if (direction < 0) { direction += 360 }
        this.setState({ runDirection: direction, isMoveActive: true })
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
        let direction = Math.atan2(relativeX, relativeY)
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
                <GameField
                    currentUserLevel={this.state.userLevel}
                    nextUserLevel={this.nextUserLevel}
                    isMoveActive={this.state.isMoveActive}
                    runDirection={this.state.runDirection}
                    maze={this.state.levelConfig.maze}
                    gameFiledPosition={this.state.levelConfig.START_USER_POSITION_PX} />
                <User />
                <Text text={`Level: ${this.state.userLevel}`}/>
            </Container>
        )
    }
}

export default Game

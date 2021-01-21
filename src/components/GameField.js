import React, { Component, PureComponent } from 'react'
import { Container, withApp } from 'react-pixi-fiber'
import { APP_HEIGHT, FIRST_LEVEL_WALLS } from '../appConfig'
import Wall from './Wall'

class GameField extends Component {
    contX = 0
    contY = 0
    state = {
        wallPositionX: 0,
        wallPositionY: 0
    }
    componentDidMount() {
        this.props.app.ticker.add(this.moveBackground)
    }
    componentWillUnmount() {
        this.props.app.ticker.remove(this.moveBackground);
    }
    getWallsBounds = (ref) => {
        let bounds = ref.getBounds()
        ref.setTransform(0, APP_HEIGHT - bounds.height)
    }
    moveBackground = () => {
        if (this.props.isMoveActive) {
            let x = this.state.wallPositionX - Math.sin(this.props.runDirection);
            let y = this.state.wallPositionY + Math.cos(this.props.runDirection);
            this.setState({ wallPositionX: x,wallPositionY:y })
        }
    }
    render() {
        return (
            <Container ref={this.getWallsBounds}>
                <Container
                    x={this.state.wallPositionX}
                    y={this.state.wallPositionY}>
                    <Wall relativeSize={FIRST_LEVEL_WALLS} />
                </Container>
            </Container>
        )
    }
}

export default withApp(GameField)
function calcY(tan) {
    return Math.sin(tan)
}
function calcX(tan) {
    return Math.cos(tan)
}
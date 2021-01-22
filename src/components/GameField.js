import React, { Component } from 'react'
import { Container, withApp } from 'react-pixi-fiber'
import { APP_HEIGHT, FIRST_LEVEL_WALLS, START_USER_POSITION_PX } from '../appConfig'
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
    walls = []
    addWall = (elem) => {
        this.walls.push(elem)
    }
    moveBackground = () => {
        if (this.props.isMoveActive) {
            let plusX = 2 * Math.sin(this.props.runDirection);
            let plusY = 2 * Math.cos(this.props.runDirection)
            if (!checkCollision(this.walls, plusX, plusY)) {
                let x = this.state.wallPositionX - plusX;
                let y = this.state.wallPositionY + plusY;
                this.setState({ wallPositionX: x, wallPositionY: y })
            } else {
                if (!checkCollision(this.walls, 0, plusY)) {
                    let x = this.state.wallPositionX;
                    let y = this.state.wallPositionY + plusY;
                    this.setState({ wallPositionX: x, wallPositionY: y })
                } else if (!checkCollision(this.walls, plusX, 0)) {
                    let x = this.state.wallPositionX - plusX;
                    let y = this.state.wallPositionY;
                    this.setState({ wallPositionX: x, wallPositionY: y })
                }
            }
        }
    }
    render() {
        console.log(START_USER_POSITION_PX.y)
        return (
            <Container y={START_USER_POSITION_PX.y}>
                <Container
                    x={this.state.wallPositionX}
                    y={this.state.wallPositionY}>
                    <Wall relativeSize={FIRST_LEVEL_WALLS} addWall={this.addWall} />
                </Container>
            </Container>
        )
    }
}

export default withApp(GameField)

function checkCollision(walls, plusX, PlusY) {
    let result = walls.findIndex(wall => {
        let bounds = wall.getBounds();
        let user = { x: 200, y: 200, width: 12, height: 15 };
        let collision = bounds.x - plusX + bounds.width > user.x &&
            bounds.x - plusX < user.x + user.width &&
            bounds.y + PlusY + bounds.height - 10 > user.y &&
            bounds.y + PlusY < user.y + user.height;
        //console.log(collision)
        if (collision) { console.log(wall.type) }
        if (wall.type == 3) { return false }
        return collision
    });
    return !!(result + 1)
}
import React, { Component } from 'react'
import { Container, withApp } from 'react-pixi-fiber'
import { APP_HEIGHT, APP_WIDTH, SPEED, _FINISH } from '../appConfig'
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
            let plusX = SPEED * Math.sin(this.props.runDirection);
            let plusY = SPEED * Math.cos(this.props.runDirection)
            let walls = []
            this.props.app.stage.children[0].children[0].children[0].children[0].children.forEach(element => {
                let children = element.children
                walls = [...walls, ...children]
            });
            let collisionWithWall = checkCollision(walls, plusX, plusY)
            if (collisionWithWall) {
                switch (collisionWithWall.type) {
                    case _FINISH:
                        this.setState({ wallPositionX: 0, wallPositionY: 0 })
                        this.props.nextUserLevel();
                        break;
                    case 'coin':
                        console.log(collisionWithWall)
                        this.props.removeCoinFromeMaze(collisionWithWall.xPosInArray, collisionWithWall.yPosInArray)
                        break;
                    default:
                        if (!checkCollision(walls, 0, plusY)) {
                            let x = this.state.wallPositionX;
                            let y = this.state.wallPositionY + plusY;
                            this.setState({ wallPositionX: x, wallPositionY: y })
                        } else if (!checkCollision(walls, plusX, 0)) {
                            let x = this.state.wallPositionX - plusX;
                            let y = this.state.wallPositionY;
                            this.setState({ wallPositionX: x, wallPositionY: y })
                        }
                        break;
                }
            } else {
                let x = this.state.wallPositionX - plusX;
                let y = this.state.wallPositionY + plusY;
                this.setState({ wallPositionX: x, wallPositionY: y })
            }
        }
    }
    render() {
        return (
            <Container x={this.props.gameFiledPosition.x} y={this.props.gameFiledPosition.y}>
                <Container
                    x={this.state.wallPositionX}
                    y={this.state.wallPositionY}>
                    <Wall update={this.props.updateWalls} maze={this.props.maze} />
                </Container>
            </Container>
        )
    }
}

export default withApp(GameField)

function checkCollision(walls, plusX, PlusY) {
    let result = walls.findIndex((wall, i) => {
        let bounds = wall.getBounds();
        let user = { x: APP_WIDTH / 2 - 15, y: APP_HEIGHT / 2 + 15, width: 30, height: 30 };
        let collision = bounds.x - plusX + bounds.width > user.x &&
            bounds.x - plusX < user.x + user.width &&
            bounds.y + PlusY + bounds.height - 10 > user.y &&
            bounds.y + PlusY < user.y + user.height;
        if (wall.type == 3) { return false }
        return collision
    });
    return walls[result]
}
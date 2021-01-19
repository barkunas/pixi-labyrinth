import React, { Component } from 'react'
import { Sprite, withApp } from 'react-pixi-fiber';
import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from '../appConfig';

const USER_IMG = 'img/sprites.json'
const FIRST_IMG_TEXTURE = 'character_base_16x16_01.png'

class User extends Component {
    state = {
        loadImg: false
    }
    componentDidMount() {
        PIXI.Loader.shared.add(USER_IMG).load(() => this.setState({ loadImg: true }))
    }
    render() {
        if (!this.state.loadImg) { return null }
        console.log(this.props.app)
        //var PIXI = this.props.app
        let sheet = PIXI.Loader.shared.resources[USER_IMG].spritesheet;
        let texture = sheet.textures[FIRST_IMG_TEXTURE]
        let position = {
            x: APP_WIDTH / 2,
            y: APP_HEIGHT / 2
        }
        return (
            <Sprite texture={texture} {...position} />
        )
    }
}

export default withApp(User)

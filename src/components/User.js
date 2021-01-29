import React, { Component } from 'react'
import { Sprite, withApp, Container } from 'react-pixi-fiber';
import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from '../appConfig';
import AnimatedSprite from './AnimatedSprite';

const USER_IMG = 'img/sprites.json'
const FIRST_IMG_TEXTURE = 'character_base_16x16_01.png'


class User extends Component {
    state = {
        loadImg: false
    }
    addUser = (ref) => {
        console.log(ref)
    }
    componentDidMount() {
        PIXI.Loader.shared.add([USER_IMG,"img/user/anim.json"]).load(() => {this.setState({ loadImg: true })}) 
        //PIXI.Loader.shared.add("img/user/useranim/appFlash_atlas_1.json").load(setup);

        function setup() {
            let sheet = PIXI.Loader.shared.resources["img/user/anim.json"].spritesheet;
            let animatedSprite = new PIXI.AnimatedSprite(sheet.animations["sprite"]);
            console.log(animatedSprite)
        }
    }
    render() {
        //console.log(this.props.app)
        if (!this.state.loadImg) { return null }
        //console.log(this.props.app)
        //var PIXI = this.props.app
        //let sheet = PIXI.Loader.shared.resources[USER_IMG].spritesheet;
        //let texture = sheet.textures[FIRST_IMG_TEXTURE]
        
        let sheet = PIXI.Loader.shared.resources["img/user/anim.json"].spritesheet;
        let position = {
            x: APP_WIDTH / 2-30,
            y: APP_HEIGHT / 2-50
        }
        return (
            <Container>
                {/* <Sprite ref={this.addUser} texture={texture} {...position} /> */}
                {<AnimatedSprite texture={sheet.animations["sprite"]} {...position}/>}
            </Container>
        )
    }
}

export default withApp(User)

import React from 'react';
import ReactDOM from 'react-dom';
import {Stage} from 'react-pixi-fiber'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Game from './Game';
import { APP_HEIGHT, APP_WIDTH } from './appConfig';
import * as PIXI from 'pixi.js'

window.PIXI = PIXI

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
ReactDOM.render(
  <Stage /* interactive={true} pointerdown={() => { console.log('ee') }} */ options={{ backgroundColor: 0x10bb99, height: APP_HEIGHT, width: APP_WIDTH }}>
    <Game/>
  </Stage>,
  document.getElementById('gameView')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

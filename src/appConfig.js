const APP_WIDTH = window.innerWidth//400;
const APP_HEIGHT = window.innerHeight//400;
const BLOCK_WIDTH = 80;
const BLOCK_HEIGHT = 80;
const BG_CELL_SIZE = 80;
const SPEED = 6

//level config
const _WALL = 1; //badrock
const _PATH = 0; //free block with coin
const _PATHCoinOff = 5 //free block without coin
const _START = 3; //cell for start
const _FINISH = 4; //cell for finish

export {
    APP_WIDTH, APP_HEIGHT,
    BLOCK_WIDTH, BLOCK_HEIGHT,
    BG_CELL_SIZE,
    SPEED,
    _WALL,
    _PATH,
    _PATHCoinOff,
    _START,
    _FINISH
}
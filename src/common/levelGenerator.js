import { APP_HEIGHT, APP_WIDTH, BLOCK_WIDTH, BG_CELL_SIZE, _WALL, _PATH, _START, _FINISH } from "../appConfig";

export default function getNewLevelConfig(COLLUMS, ROWS) {
  // 1. Start with a grid full of walls.

  let _COLLUMS = COLLUMS;
  let _ROWS = ROWS;

  let maze = [];
  for (let i = 0; i < _COLLUMS; i++) {
    maze.push([]);
    for (let j = 0; j < _ROWS; j++)
      maze[i][j] = _WALL;
  }

  // 2. Pick a cell, mark it as part of the maze. 

  let cell = { x: Math.floor(Math.random() * _COLLUMS), y: Math.floor(Math.random() * _ROWS) };
  maze[cell.x][cell.y] = _PATH;

  // 2.1 Add the walls of the cell to the wall list.

  let walls = [];
  if (cell.x + 1 < _COLLUMS) walls.push({ x: cell.x + 1, y: cell.y });
  if (cell.x - 1 >= 0) walls.push({ x: cell.x - 1, y: cell.y });
  if (cell.y + 1 < _ROWS) walls.push({ x: cell.x, y: cell.y + 1 });
  if (cell.y - 1 >= 0) walls.push({ x: cell.x, y: cell.y - 1 });

  // 3. While there are walls in the list:

  while (walls.length > 0) {

    // 3.1 Pick a random wall from the list.

    let wallIndex = Math.floor(Math.random() * walls.length);
    let wall = walls[wallIndex];

    // 3.2 If only one of the two cells that the wall divides is visited, then:

    let uc = []; // uc will be short for 'unvisited cell'

    if (wall.x + 1 < _COLLUMS && maze[wall.x + 1][wall.y] === _PATH) uc.push({ x: wall.x - 1, y: wall.y });
    if (wall.x - 1 >= 0 && maze[wall.x - 1][wall.y] === _PATH) uc.push({ x: wall.x + 1, y: wall.y });
    if (wall.y + 1 < _ROWS && maze[wall.x][wall.y + 1] === _PATH) uc.push({ x: wall.x, y: wall.y - 1 });
    if (wall.y - 1 >= 0 && maze[wall.x][wall.y - 1] === _PATH) uc.push({ x: wall.x, y: wall.y + 1 });

    if (uc.length === 1) {

      // 3.2.1 Make the wall a passage and mark the unvisited cell as part of the maze.

      maze[wall.x][wall.y] = _PATH;
      if (uc[0].x >= 0 && uc[0].x < _COLLUMS && uc[0].y >= 0 && uc[0].y < _ROWS) {
        maze[uc[0].x][uc[0].y] = _PATH;

        // 3.2.2 Add the neighboring walls of the cell to the wall list.

        if (uc[0].x + 1 < _COLLUMS && maze[uc[0].x + 1][uc[0].y] === _WALL) walls.push({ x: uc[0].x + 1, y: uc[0].y });
        if (uc[0].x - 1 >= 0 && maze[uc[0].x - 1][uc[0].y] === _WALL) walls.push({ x: uc[0].x - 1, y: uc[0].y });
        if (uc[0].y + 1 < _ROWS && maze[uc[0].x][uc[0].y + 1] === _WALL) walls.push({ x: uc[0].x, y: uc[0].y + 1 });
        if (uc[0].y - 1 >= 0 && maze[uc[0].x][uc[0].y - 1] === _WALL) walls.push({ x: uc[0].x, y: uc[0].y - 1 });
      }
    }

    // 3.3 Remove the wall from the list.

    walls.splice(wallIndex, 1);
  }
  //maze[cell.x][cell.y] = _START;
  maze.forEach((array, i) => {
    array.unshift(1)
    array.push(1)
  })
  maze.unshift((function () {
    let arr = [];
    maze[0].forEach(() => {
      arr.push(1)
    })
    return arr
  })())
  maze.push((function () {
    let arr = [];
    maze[0].forEach(() => {
      arr.push(1)
    })
    return arr
  })())
  maze[1][1] = _START
  maze[maze.length-2][maze[0].length-2] = _FINISH;
  const START_USER_POSITION = []
  START_USER_POSITION[0] = maze.findIndex(array => { return (0 <= array.find(elem => elem == _START)) });
  START_USER_POSITION[1] = maze[START_USER_POSITION[0]].findIndex(elem => elem == _START)
  const START_USER_POSITION_PX = {
    x: 0 - START_USER_POSITION[1] * BLOCK_WIDTH + APP_WIDTH / 2-40,
    y: 0 - START_USER_POSITION[0] * BG_CELL_SIZE + APP_HEIGHT / 2
  }

  return {
    maze,
    START_USER_POSITION_PX
  }
}
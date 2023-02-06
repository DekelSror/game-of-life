import {nextGeneration, startGame} from './api'
import { Board, Cell, Coordinate } from './models'

const blinker_1: Coordinate[] = [{x:1, y: 0}, {x:1, y: 1}, {x:1, y: 2}]

export class Store {
    boardSize = {x: 3, y: 3}
    boardType = 'flat'
    devBoardState = 1
    currentGen = 0

    board: Board = {
        living_cells: blinker_1.map(coordinate => new Cell(coordinate)),
        dead_cells: []
    }

    constructor() {
        startGame(this.board).then(brd => this.board = brd)
    }


    setBoardSize(size: {x: number, y: number}) {
        this.boardSize = size
        // future - call backend
    }

    nextGen = async() => {
        this.board = await nextGeneration()
    }
}


const gameStore = new Store()

export default gameStore
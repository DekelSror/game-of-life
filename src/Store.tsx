import React from 'react'
import {nextGeneration, startGame} from './api'
import { useRefresh } from './App'
import { Board, Cell, Coordinate } from './models'

const blinker_1: Coordinate[] = [{x:1, y: 0}, {x:1, y: 1}, {x:1, y: 2}]

type StoreEvent = string

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

export const withStore = <P extends object>(Cmp: React.FunctionComponent<P>) => {
    return (props: P) => <Cmp {...props} store={gameStore} />
}

export const useStore: (refreshFor?: StoreEvent[]) => [Store, (e: {name: StoreEvent, payload?: any}) => Promise<void>] = refreshFor => {
    const refresh = useRefresh()
    
    const send = async(e: {name: StoreEvent, payload?: any}) => {
        switch (e.name) {
            case 'next-gen':
                await gameStore.nextGen()
                break
            default:
                break
        }

        if (!refreshFor || refreshFor.includes(e.name)) refresh()
    }

    return [gameStore, send]
}

export default gameStore
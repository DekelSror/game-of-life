import React from 'react'
import {nextGeneration, startGame} from './api'
import { useRefresh } from './App'
import { Board, Cell, Coordinate } from './models'

const blinker_1: Coordinate[] = [{x:1, y: 0}, {x:2, y: 1}, {x:0, y: 2}]

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

    async start() {
        const initialBoard: Board = await startGame(this.board)
        this.board = initialBoard
    }

    setBoardSize(size: {x: number, y: number}) {
        this.boardSize = size
        // future - call backend
    }

    nextGen = async() => {
        this.board = await nextGeneration()
    }

    createCoords(first: Coordinate, second: Cell[]){

        const list = second.map((c) => {
            
                if(this.compareCoords(c.coordinate, first))
                    return 'X'
        }
            )
        

        
        return list
    }
    compareCoords(first: Coordinate, second: Coordinate){
        return first.x == second.x && first.y == second.y;
    }
}



const gameStore = new Store()


export const useStore: (refreshFor?: StoreEvent[]) => [Store, (name: StoreEvent) => Promise<void>] = refreshFor => {
    const refresh = useRefresh()
    
    const send = async(name: StoreEvent) => {
        switch (name) {
            case 'next-gen':
                await gameStore.nextGen()
                break
            case 'start':
                await gameStore.start()
                break
            default:
                break
        }

        if (!refreshFor || refreshFor.includes(name)) {
            refresh()
        }
    }
    return [gameStore, send]
}

export default gameStore
import { Board } from "./models"



export const startGame: (board: Board) => Promise<Board> = async(board) => {

    console.log('start game with', board)

    const res = await fetch('http://localhost:3001/game/play', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(board)
    })

    console.log('start game res')

    return await res.json() as Board
}

export const nextGeneration = async() => {
    console.log('nextgen called!')

    const boardPromise = await fetch('http://localhost:3001/next_generation')

    const boardAfter: Board = await boardPromise.json()

    return  boardAfter
}



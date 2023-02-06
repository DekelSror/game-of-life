import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gameStore, { Store } from './Store'

const World = (props: {store: Store}) => {
    const {store} = props
    
    const a = (() => {
        let arr = []
        for (let i = 0; i < store.boardSize.x * store.boardSize.y; i++) {
            arr.push(i)
        }

        return arr
    })()

    return <div style={{width: 100, display: 'flex', flexGrow: 10, flexWrap: 'wrap'}} >
    {a.map((cell, i) => {
        const coords = {x: i % store.boardSize.x, y: Math.floor(i / store.boardSize.x)}

        
        return <div key={cell} style={{textAlign: 'center', fontSize: 20, flexGrow: 1, height: 30, width: 30, border: '1px solid grey'}} >
            {gameStore.board.living_cells.map(c => c.coordinate).includes(coords) ? 'x' : 'o'}
        </div>
    })}
    
    </div>
}

const App = () => {
    const [refresh, setRefresh] = useState(false)

    const f5 = () => setRefresh(!refresh)
    const gotoGen = useRef(0)

    // useEffect(() => {
    //     startGame(gameStore.board)

        
    // })

    return <div>
        <World store={gameStore} />
        <h4> {gameStore.currentGen} </h4>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <button onClick={() => {
                gameStore.nextGen()
                f5()
            }} > 
                next episode 
            </button>
        </div>
    </div>
}

export default App;
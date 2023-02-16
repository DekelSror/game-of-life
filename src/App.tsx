import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gameStore, { Store, useStore } from './Store'

const World = () => {
    const [store, send] = useStore(['next-gen'])
    // update world for next gen to render new board
    
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

export const useRefresh = () => {
    const [refresh, setRefresh] = useState(false)
    
    return () => setRefresh(!refresh)
}

const App = () => {
    const [store, send] = useStore(['next-gen'])
    // update app for gen counter

    return <div>
        <World />
        <h4> {store.currentGen} </h4>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <button onClick={() => {
                send({name: 'next-gen'})
            }} > 
                next episode 
            </button>
        </div>
    </div>
}

export default App;

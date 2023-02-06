export type Coordinate = {x: number, y: number}

export type Board = {
    living_cells: Cell[]
    dead_cells: Cell[]
}

class Cell{
    is_alive: boolean = true
    next_state: boolean = false
    is_dirty: boolean = false
    coordinate: Coordinate = {x: 0, y: 0}
    living_neigbers: number = 0

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate
    }
}


export {Cell}
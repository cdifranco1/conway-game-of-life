

class Cell{
  constructor(x, y, alive=false){
    this.alive = alive
    this.neighbors = {}
    this.x = x
    this.y = y
  }

  toggleAlive = () => {
    this.alive = !this.alive
  }
  
  isAlive = () => {
    return this.alive
  }

  addNeighbor = (cell) => {

  }
}

module.exports = Cell
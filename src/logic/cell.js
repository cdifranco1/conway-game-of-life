

class Cell{
  constructor(x, y, boardCols, boardRows, alive=0){
    this.alive = alive
    this.neighbors = []
    this.x = x
    this.y = y
    this.boardCols = boardCols
    this.boardRows = boardRows
    this.populateNeighbors()
  }

  toggleAlive = () => {
    if (this.alive){
      this.alive = 0
    }
    if (!this.alive){
      this.alive = 1
    }
  }

  setAlive = () => {
    this.alive = 1
  }

  setDead = () => {
    this.alive = 0
  }

  populateNeighbors = () => {
    if (this.neighbors.length > 0){
      console.log(this.neighbors)
      return null
    }
    for (let i = this.x - 1; i < this.x + 1; i++){
      for (let j = this.y - 1; j < this.y + 1; j++){
        if (i !== this.x || j !== this.y){
          if (i >= 0 && i < this.boardCols && j >= 0 && j < this.boardRows){
            this.neighbors.push({x: i, y: j})
          }
        }
      }
    }
  }
}

module.exports = Cell
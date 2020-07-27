const Cell = require("./cell")

class Game {
  constructor(cols, rows) {
    this.board = []
    this.cols = cols
    this.rows = rows
  }

  createBoard = () => {
    for (let i = 0; i < this.rows; i++){
      const row = []
      for (let j = 0; j < this.cols; j++){
        row.push(new Cell(j, i))
      }
      this.board.push(row)
    }
  }
}

const game = new Game(10, 10)

game.createBoard()

console.log(game)

module.exports = Game
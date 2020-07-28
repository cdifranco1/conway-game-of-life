import React, { useEffect } from "react"
import Square from "./Square"
import Cell from "./logic/cell"


const Game = ({ rows, cols }) => {
  const [ board, setBoard ] = React.useState([])

  const boardHeight = 900
  const squareHeight = `${boardHeight / rows}px`

  
  const createBoard = () => {
    const newBoard = []
    for (let i = 0; i < rows; i++){
      const row = []
      for (let j = 0; j < cols; j++){
        row.push(new Cell(j, i, 12, 12))
      }
      newBoard.push(row)
    }
    setBoard(newBoard)
  }
  
  useEffect(createBoard, [])


  const checkNeighbors = (cell) => {
    const aliveNeighbors = cell.neighbors.reduce((a, b) => {
      return board[a.x][a.y].alive + board[b.x][b.y].alive 
    }, 0);
    if (!cell.alive && aliveNeighbors >= 3){
      cell.setAlive()
    }
    if (cell.alive && aliveNeighbors < 2){
      cell.setDead()
    }
  }

  const nextGeneration = () => {
    const newBoard = [...board]
    newBoard.forEach(row => {
      row.forEach(cell => {
        checkNeighbors(cell)
      })
    });
    setBoard(newBoard)
  }

  const setCellAlive = (x, y) => {
    const cell = board[y][x]
    console.log(cell)
    cell.setAlive()
  }

  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto flex flex-wrap w-3/6 border bg-black" style={{ height: boardHeight }} >
        {board.map(el => el.map((el, i) => {
        return <Square key={i} setCellAlive={setCellAlive} alive={el.alive} x={el.x} y={el.y} cols={cols} height={squareHeight}/>
      }))}
      </div>
    </div>
  )
}

export default Game


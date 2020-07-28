import React, { useEffect, useCallback } from "react"
import Square from "./Square"
import produce from "immer"


const Game = ({ rows, cols }) => {
  const [ board, setBoard ] = React.useState([])
  const [ iterate, setIterate ] = React.useState(false)
  const iterateRef = React.useRef(false)


  const liveNeighbors = (x, y, b) => {
    let total = 0
    for (let i = y - 1; i <= y + 1; i++){
      for (let j = x - 1; j <= x + 1; j++){
        if (i >= 0 && i < rows && j >=0 && j < cols){
          if (i !== y || j !== x){
            total += b[i][j]
          }
        }
      }
    }
    return total
  }

  const runGame = () => {
    if (!iterateRef.current){
      return
    }
    nextGeneration()
    setTimeout(runGame, 200)
  }

  const boardHeight = 900
  const squareHeight = `${boardHeight / rows}px`


  const toggleAlive = (x, y) => {
    if (!iterateRef.current){
      setBoard(produce(board, boardCopy => {
        if (boardCopy[y][x] === 0){
          boardCopy[y][x] = 1
        } else if (boardCopy[y][x] === 1){
          boardCopy[y][x] = 0
        }
      }))
    }
  }

  
  const createBoard = () => {
    const newBoard = []
    for (let i = 0; i < rows; i++){
      newBoard.push(Array.from(Array(cols), () => 0))
    }
    setBoard(newBoard)
  }
  
  useEffect(createBoard, [])

 

  const nextGeneration = () => {
    setBoard(board => produce(board, boardCopy => {
      board.forEach((row, i) => {
        row.forEach((cell, j) => {
          const neighbors = liveNeighbors(j, i, board)
          // console.log(`y:${i}; x:${j}: n:${neighbors}`)
          if (neighbors === 3){
            boardCopy[i][j] = 1
          } else if (cell && (neighbors === 2 || neighbors === 3)){
            return
          } else {
            boardCopy[i][j] = 0
          }
        })
      })
    }))
  }

  const toggleStart = () => {
    setIterate(!iterate)
    iterateRef.current = !iterateRef.current
    runGame()
  }


  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto flex flex-wrap w-3/6 border bg-black" style={{ height: boardHeight }} >
        {board.map((el, i) => el.map((el, j) => <Square key={`${i}${j}`} toggleAlive={toggleAlive} alive={el ? true : false} x={j} y={i} cols={cols} rows={rows} height={squareHeight}/>
      ))}
      </div>
      {/* button starts the iterations */}
      <button onClick={toggleStart}>
        {iterate ? "Stop Simulation" : "Start Simulation"}
      </button>
    </div>
  )
}

export default Game


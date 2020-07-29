import React, { useEffect, useCallback } from "react"
import Square from "./Square"
import produce from "immer"
import { presets } from "./Presets"




const Game = ({ rows, cols }) => {
  const [ board, setBoard ] = React.useState([])
  const [ iterate, setIterate ] = React.useState(false)
  // const [ selectedPreset, setSelectedPreset ] = React.useState({})
  const iterateRef = React.useRef(false)
  const [ randAliveCells, setRandAliveCells ]  = React.useState(200) 
  
  const centerCol = Math.floor(cols / 2)
  const centerRow = Math.floor(rows / 2)

  const randomize = () => {
    for (let i = 0; i < randAliveCells; i++){
      const col = Math.floor(Math.random() * cols)
      const row = Math.floor(Math.random() * rows)
      toggleAlive(col, row)
    }
  }

  const presetBoard = (preset) => {
    resetBoard()
    preset.offsets.forEach(([yOffset, xOffset]) => {
      const y = centerRow + yOffset
      const x = centerCol + xOffset
      toggleAlive(x, y)
    }) 
  }

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
      setBoard(board => produce(board, boardCopy => {
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

  const resetBoard = () => {
    setIterate(false)
    iterateRef.current = false
    setBoard(board.map(el => el.map(el => 0)))
  }

  return (
    <div className="py-5 px-20 flex border border-black h-screen">
      <div>
        <div className="flex flex-wrap w-3/6 border bg-black" style={{ height: boardHeight }} >
          {board.map((el, i) => el.map((el, j) => <Square key={`${i}${j}`} toggleAlive={toggleAlive} alive={el ? true : false} x={j} y={i} cols={cols} rows={rows} height={squareHeight}/>
        ))}
        </div>
        <div className="border border-black w-3/6 flex justify-evenly">
          <button className="px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white shadow-md rounded-md focus:outline-none focus:shadow-outline active:bg-blue-700" onClick={toggleStart}>
            {iterate ? "Stop Simulation" : "Start Simulation"}
          </button>
          <button className="px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white shadow-md rounded-md focus:outline-none focus:shadow-outline active:bg-blue-700" onClick={resetBoard}>
            Reset Simulation
          </button>
        </div>
      </div>
      <div className="border border-black flex flex-col">
        {presets.map(el => {
          return <button onClick={() => presetBoard(el)}>{el.name}</button>  
        })}
        <button onClick={randomize}>Randomize</button>
      </div>
    </div>
  )
}

export default Game


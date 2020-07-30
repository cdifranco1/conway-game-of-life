import React, { useEffect, useCallback, useMemo } from "react"
import Square from "./Square"
import produce from "immer"
import { presets } from "../Presets"


const Game = ({ rows, cols }) => {
  const [ board, setBoard ] = React.useState([])
  const [ iterate, setIterate ] = React.useState(false)
  const [ genCount, setGenCount ] = React.useState(0)
  const iterateRef = React.useRef(false)
  const [ randAliveCells, setRandAliveCells ]  = React.useState(300) 
  // const [ liveNeighbors, setLiveNeighbors ] = React.useState([])
  
  const centerCol = Math.floor(cols / 2)
  const centerRow = Math.floor(rows / 2)


  const randomize = () => {
    for (let i = 0; i < randAliveCells; i++){
      const col = Math.floor(Math.random() * cols)
      const row = Math.floor(Math.random() * rows)
      toggleAlive(col, row)
    }
    setGenCount(0)
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
    setTimeout(runGame, 20)
  }

  const boardHeight = 525
  const squareHeight = `${boardHeight / rows}`


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
    setGenCount(prevState => prevState + 1)
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
    setGenCount(0)
  }

  return (
    board.length ?
      <>
        <div className="w-full md:w-3/6">
          <h3 className="text-2xl pb-3 tracking-wide">Generation: {`${genCount}`}</h3>

          {/* main board component */}
          <div className="flex flex-wrap shadow-md w-full" style={{ height: boardHeight }} >
            {board.map((el, i) => el.map((el, j) => <Square key={`${i}-${j}`} toggleAlive={toggleAlive} alive={el ? true : false} x={j} y={i} cols={cols} rows={rows} height={squareHeight}/>
          ))}
          </div>

          {/* this needs to go in separate component */}  
          {/* buttons to control the board */}  
          <div className="w-full flex justify-evenly p-3">
            <button className={`px-3 py-2 ${!iterate ? "bg-green-500 hover:bg-green-600 active:bg-green-700" : "bg-red-500 hover:bg-red-600 active:bg-red-700"} text-white shadow-md rounded-md focus:outline-none focus:shadow-outline`} onClick={toggleStart}>
              {iterate ? "Pause" : "Play"}
            </button>
            <button className="px-3 py-2 bg-green-400 hover:bg-green-500 text-white shadow-md rounded-md focus:outline-none focus:shadow-outline active:bg-green-700" onClick={nextGeneration}>
              Step Forward
            </button>
            <button className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white shadow-md rounded-md focus:outline-none focus:shadow-outline active:bg-blue-900" onClick={resetBoard}>
              Reset
            </button>
            <button className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white shadow-md rounded-md focus:outline-none focus:shadow-outline active:bg-blue-900" onClick={randomize}>Randomize</button>
          </div>
        </div>

        {/* this needs to go in separate component */}
        {/* preset cell patterns */}
        <div className="mt-10 md:ml-10 md:w-1/8 md:mt-0 border border-gray-400 shadow-md">
          <h3 className="text-xl font-semibold bg-gray-400 w-full p-4">Preset Patterns</h3>
          <div className="flex justify-around p-4 md:p-0 md:flex md:flex-col items-center">
            {presets.map((el, i) => {
              return (
                <div key={`${el.name}-${i}`} className="w-1/8 md:w-7/12 md:my-4">
                  <button 
                    className="position relative rounded-lg shadow-md border border-gray-300 focus:outline-none focus:shadow-outline overflow-hidden w-full"
                    onClick={() => presetBoard(el)}
                  >
                    <img className="object-cover w-full h-full" src={el.imgSrc} />
                    <p className="font-semibold py-1">{el.name}</p>
                  </button>
                </div>
              )
            })}
          </div>
        </div> 
      </>
      :
      <h1>Loading...</h1>
  )
}

export default Game


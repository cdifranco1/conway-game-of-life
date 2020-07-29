import React, { useEffect, useCallback, useMemo } from "react"
import Square from "./Square"
import produce from "immer"
import { presets } from "./Presets"

const neighborOffsets = [
  [-1,0],
  [-1, -1],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 1],
  [1, 0]
]


const Game = ({ rows, cols }) => {
  const [ board, setBoard ] = React.useState([])
  const [ iterate, setIterate ] = React.useState(false)
  const [ genCount, setGenCount ] = React.useState(0)
  const [ changeList, setChangeList ] = React.useState([])
  const iterateRef = React.useRef(false)
  const genRef = React.useRef(0)
  const [ randAliveCells, setRandAliveCells ]  = React.useState(300) 
  
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
    
    neighborOffsets.forEach(([yOffset, xOffset]) => {
      const newY = y + yOffset
      const newX = x + xOffset
      if (newY >= 0 && newY < rows && newX >= 0 && newX < cols){
        total += b[newY][newX]
      }
    })

    return total
  }

  const runGame = () => {
    if (!iterateRef.current){
      return
    }
    if (genRef.current == 0){
      nextGeneration()
    }
    console.log(changeList)
    handleWorkCells(createWorkCells())
    setTimeout(runGame, 100)
  }

  const boardHeight = 900
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

  const createWorkCells = () => {
    return Array.from(new Set(changeList))
  }
  
  const handleWorkCells = (workCells) => {
    console.log(workCells)
    setChangeList([])
    setBoard(board => {
      return produce(board, boardCopy => {
        workCells.forEach(el => {
          neighborOffsets.forEach(([yOffset, xOffset]) => {
            const newY = el.y + yOffset
            const newX = el.x + xOffset
            const neighbors = liveNeighbors(newY, newX, board)
            if (neighbors === 3){
              boardCopy[newY][newX] = 1
              setChangeList(changeList => produce(changeList, changeListCopy => changeList.push({x: newX, y: newY})))
             } else if (board[newY][newX] && (neighbors < 2 || neighbors > 3)){
              boardCopy[newY][newX] = 0
              setChangeList(changeList => produce(changeList, changeListCopy => changeList.push({x: newX, y: newY})))
            }
          })
        })
      })
    })
  }

  const nextGeneration = () => {
    setBoard(board => produce(board, boardCopy => {
      board.forEach((row, i) => {
        row.forEach((cell, j) => {
          const neighbors = liveNeighbors(j, i, board)
          if (neighbors === 3){
            boardCopy[i][j] = 1
            setChangeList(changeList => produce(changeList, changeListCopy => {changeListCopy.push({x: j, y: i})}))
           } else if (cell && (neighbors < 2 || neighbors > 3)){
            boardCopy[i][j] = 0
            setChangeList(changeList => produce(changeList, changeListCopy => {changeListCopy.push({x: j, y: i})}))
          }
          // } else if (cell && (neighbors === 2 || neighbors === 3)){
          //   return
          // } else {
          //   boardCopy[i][j] = 0
        })
      })
    }))
    console.log(changeList)
    setGenCount(prevState => prevState + 1)
    genRef.current += 1
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
        <div className="w-3/6">
          <h3 className="text-2xl py-4 tracking-wide">Generation: {`${genCount}`}</h3>
          <div className="flex flex-wrap shadow-md w-full border-gray-400 border" style={{ height: boardHeight }} >
            {board.map((el, i) => el.map((el, j) => <Square key={`${i}-${j}`} toggleAlive={toggleAlive} alive={el ? true : false} x={j} y={i} cols={cols} rows={rows} height={squareHeight}/>
          ))}
          </div>

          {/* this needs to go in separate component */}  
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
        <div className="flex flex-col flex-wrap justify-between items-center ml-10 w-1/10 max-h-screen mt-2 border border-gray-400 shadow-md">
          <h3 className="text-2xl font-semibold bg-gray-400 w-full p-4">Preset Patterns</h3>
          {presets.map((el, i) => {
            return (
              <div key={`${el.name}-${i}`} className="w-7/12 my-2">
                <button 
                  className="position relative rounded-lg shadow-md focus:outline-none focus:shadow-outline overflow-hidden w-full"
                  onClick={() => presetBoard(el)}
                >
                  <img className="object-cover w-full h-full" src={el.imgSrc} />
                  <p className="text-xl font-semibold py-2">{el.name}</p>
                </button>
              </div>
            )
          })}
        </div> 
      </>
      :
      <h1>Loading...</h1>
  )
}

export default Game


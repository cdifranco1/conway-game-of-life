import React, { useEffect } from "react"
import Square from "./Square"


const Game = ({rows, cols}) => {
  const [ board, setBoard ] = React.useState([])

  const boardHeight = 900
  const squareHeight = `${boardHeight / rows}px`

  useEffect(() => {
    createBoard()
    console.log(board)
  }, [])

  const createBoard = () => {
    const newBoard = []
    for (let i = 0; i < rows; i++){
      const row = []
      for (let j = 0; j < cols; j++){
        row.push({x: j, y: i})
      }
      newBoard.push(row)
    }
    setBoard(newBoard)
  }

  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto flex flex-wrap w-3/6 border bg-black" style={{ height: boardHeight }} >
        {board.map(el => el.map(el => <Square cols={cols} height={squareHeight}/>))}
      </div>
    </div>
  )
}

export default Game


import React, { useEffect } from "react"



const Square = ({x, y, alive, toggleAlive, cols, rows, squareHeight}) => {
  const [ neighbors, setNeighbors ] = React.useState([])
  const width = `1/${cols}`
  const bgColor = alive ? "bg-white" : "bg-blue-200"
  const borderR = x == cols - 1 ? "border-r" : null
  const borderB = y == rows - 1 ? "border-b" : null

  return (
    <div onClick={() => toggleAlive(x, y)} className={`w-${width} ${bgColor} ${borderR} ${borderB} border-l border-t border-gray-500`} style={{ height: squareHeight }}>
    </div>
  )
}

export default Square


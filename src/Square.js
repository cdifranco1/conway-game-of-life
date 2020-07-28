import React, { useEffect } from "react"



const Square = ({x, y, alive, toggleAlive, cols, rows, squareHeight}) => {
  const [ neighbors, setNeighbors ] = React.useState([])
  const width = `1/${cols}`
  const bgColor = alive ? "bg-white" : "bg-black"

  return (
    <div onClick={() => toggleAlive(x, y)} style={{ height: squareHeight }} className={`w-${width} border border-white ${bgColor}`}>
    </div>
  )
}

export default Square


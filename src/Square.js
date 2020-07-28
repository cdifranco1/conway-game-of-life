import React, { useEffect } from "react"



const Square = ({x, y, alive, setCellAlive, cols, squareHeight}) => {
  const [ neighbors, setNeighbors ] = React.useState([])
  const width = `1/${cols}`
  const bgColor = alive ? "bg-white" : "bg-black"

  // toggleAlive = () => {
  //   if (this.alive){
  //     this.alive = 0
  //   }
  //   if (!this.alive){
  //     this.alive = 1
  //   }
  // }

  // setAlive = () => {
  //   this.alive = 1
  // }

  // setDead = () => {
  //   this.alive = 0
  // }

  // populateNeighbors = () => {
  //   if (this.neighbors.length > 0){
  //     console.log(this.neighbors)
  //     return null
  //   }
  //   for (let i = this.x - 1; i < this.x + 1; i++){
  //     for (let j = this.y - 1; j < this.y + 1; j++){
  //       if (i !== this.x || j !== this.y){
  //         if (i >= 0 && i < this.boardCols && j >= 0 && j < this.boardRows){
  //           this.neighbors.push({x: i, y: j})
  //         }
  //       }
  //     }
  //   }
  // }

  // useEffect(populateNeighbors, [])

  return (
    <div onClick={() => setCellAlive(x, y)} style={{ height: squareHeight }} className={`w-${width} border border-white ${bgColor}`}>
    </div>
  )
}

export default Square


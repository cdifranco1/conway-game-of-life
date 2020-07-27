import React from "react"



const Square = ({cols, squareHeight}) => {
  const width = `1/${cols}`
  
  return (
    <div style={{ height: squareHeight }} className={`w-${width} border border-white`}>

    </div>
  )
}

export default Square
import React from "react"


const Header = () => {
  return (
    <div className="flex items-center tracking-wide bg-gray-400 position sticky" style={{ height: "10vh"}}>
      <h1 className="text-4xl font-semibold font-mono text-black px-6">John Conway's Game of Life</h1>
    </div>
  )
}

export default Header
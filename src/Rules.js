import React from "react"

const Rules = () => {
  return (
    <div className="w-5/12 text-2xl font-serif p-5 border border-gray-300 ml-10 shadow-md">
      <h2 className="text-3xl font-bold">Rules</h2>
      <p className="px-3 my-5">The Game of Life is a cellular automaton where each cell in a grid (typically two-dimensional), can have two different states, "alive" or "dead". Each cell's behavior is based on it's eight surrounding neighbors, and each generation of the grid is a pure function of the previous grid.</p>
      <p className="px-3 my-5">For each generation, the grid transitions based on the following rules:</p>
      <ul className="mt-5 pl-8 pr-3">
        <li className="list-decimal px-2 py-2">
          If a cell is dead and has less than 2 live neighbors, it dies, as if by underpopulation.
        </li>
        <li className="list-decimal px-2 py-2">
          If a cell is dead and has exactly 3 live neighbors, it becomes alive, as if by reproduction.
        </li>
        <li className="list-decimal px-2 py-2">
          If a cell is alive and has more than 3 live neighbors, it dies, as if by overpopulation.
        </li>
        <li className="list-decimal px-2 py-2">
          If a cell is alive and has 2 or 3 live neighbors, it remains alive.
        </li>
      </ul>
      {/* <p>
        Since the creation of the game by John Conway, both rare and common patterns were discovered from runnning the simulation. Some common patterns include oscillators, spaceships, and still lifes. 
        
        Oscillators cycle through patterns before utlimately returning to their original patterns. An example of an oscillator is the <span className="italic">Toad</span> pattern.


      </p> */}
    </div>
  )
}

export default Rules
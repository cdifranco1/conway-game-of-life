import React from "react"

const About = () => {
  return (
    <div className="py-5 mt-5">
      <h2 className="text-3xl py-2">About this Algorithm</h2>
        <p className="text-lg">Conway's Game of Life ("Life") is a cellular automaton created by the British mathematician John Conway in 1970. The game is a cellular automaton where each grid state relies on the previous grid state. Life's universe, or grid, is theoretically infinite, and  the game is able to express logic through different complex patterns created from specific cell arrangements. These characteristics make Life Turing-complete.</p>

        <h2 className="text-2xl pt-3 pb-2">Implementation and Optimization</h2>
        <p className="text-lg">The above implementation of Life utilizes a 2D array and an inner loop to check neighboring cells. The inner loop uses the count of live neighboring cells to determine whether each cell will be live or dead in the following grid state. The entire grid state is updated in a new 2D array before replacing the previous grid. This implementation is sufficient for a smaller grid size, but is far from optimized, and the simulation becomes slower as the grid grows. The fastest and most famous optimization for Life is Bill Gosper's <a className="text-purple-600 visited:text-purple-800" href="https://en.wikipedia.org/wiki/Hashlife">Hashlife</a> algorithm, which utilizes memoization and a quad-tree data structure.</p>
    </div>
  )
}

export default About
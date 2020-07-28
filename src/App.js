import React from 'react';
import Game from "./Game"



function App() {
  // const Board = new Game(12, 12)
  // Board.createBoard()
  // const boardHeight = 900
  // const squareHeight = `${boardHeight / Board.rows}px`

  return (
    <Game rows={25} cols={25}/>
    // <div className="flex items-center h-screen">
    //   <div className="mx-auto flex flex-wrap w-3/6 border bg-black" style={{ height: boardHeight }} >
    //     {Board.board.map(el => el.map(el => <Square cols={Board.cols} height={squareHeight}/>))}
    //   </div>
    // </div>
  );
}



export default App;

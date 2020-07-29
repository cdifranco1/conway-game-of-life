import React from 'react';
import Game from "./Game"

export const cols = 50
export const rows = 50

function App() {
  return (
    <Game rows={rows} cols={cols}/>
  );
}



export default App;

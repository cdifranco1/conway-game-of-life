import React from 'react';
import Game from "./Game"
import Header from "./Header"

export const cols = 50
export const rows = 50

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="py-5 px-20 flex bg-gray-100 w-full">
        <Game rows={rows} cols={cols}/>
      </div>
    </div>
  );
}



export default App;

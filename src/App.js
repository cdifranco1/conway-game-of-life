import React from 'react';
import Game from "./Game"
import Header from "./Header"
import Rules from "./Rules"
import About from "./About"

export const cols = 50
export const rows = 50

function App() {
  return (
    <div className="h-screen bg-gray-100 ">
      <Header />
      <div className="py-5 px-10">
        <div className="flex flex-col md:flex-row w-full font-serif">
          <Game rows={rows} cols={cols}/>
          <Rules />
        </div>
        <About />
      </div>
    </div>
  );
}



export default App;

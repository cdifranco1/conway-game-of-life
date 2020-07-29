import acorn from "./assets/imgs/acorn.png" 
import blinker from "./assets/imgs/blinker.png" 
import diehard from "./assets/imgs/diehard.png" 
import gasper_gun from "./assets/imgs/gasper_gun.png" 
import glider from "./assets/imgs/glider.png" 
import toad from "./assets/imgs/toad.png" 

export const presets = [
  {
    name: "Gosper Glider Gun",
    offsets: [
      [0, 0],
      [0, -4],
      [1, -4],
      [-1, -4],
      [2, -3],
      [-2, -3],
      [3, -2],
      [-3, -2],
      [3, -1],
      [-3, -1],
      [2, 1],
      [-2, 1],
      [1, 2],
      [-1, 2],
      [0, 2],
      [0, 3],
      [1, 6],
      [1, 7],
      [2, 6],
      [2, 7],
      [3, 6],
      [3, 7],
      [4, 8],
      [0, 8],
      [4, 10],
      [0, 10],
      [5, 10],
      [-1, 10],
      [2, 20],
      [3, 20],
      [2, 21],
      [3, 21],
      [0, -13],
      [1, -13],
      [0, -14],
      [1, -14],
    ],
    imgSrc: gasper_gun
  },
  {
    name: "Acorn",
    offsets: [
      [1, -1],
      [0, 1],
      [-1, -1],
      [-1, -2],
      [-1, 2],
      [-1, 3],
      [-1, 4]
    ],
    imgSrc: acorn
  },
  {
    name: "Diehard",
    offsets: [
      [0, -2],
      [0, -3],
      [-1, -2],
      [1, 3],
      [-1, 2],
      [-1, 3],
      [-1, 4]
    ],
    imgSrc: diehard
  },
  {
    name: "Glider",
    offsets: [
      [1, 0],
      [0, 1],
      [-1, 0],
      [-1, -1],
      [-1, 1]
    ],
    imgSrc: glider
  },
  // {
  //   name: "Blinker",
  //   offsets: [
  //     [0, 0],
  //     [1, 0],
  //     [-1, 0]
  //   ],
  //   imgSrc: blinker
  // },
  {
    name: "Toad",
    offsets: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, -1],
      [0, -1],
      [0, -2]
    ],
    imgSrc: toad
  },
]


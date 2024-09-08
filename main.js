import EliminacionGuassiana from "./src/EliminacionGuassiana.js"

let matriz = [
    [ 1,  2, -1,  3],
    [ 2,  3,  0, -1],
    [ 3, -1,  2,  2],
    [-1,  4, -2,  1],
]

let constantes = [4, 5, 6, 7]

EliminacionGuassiana(matriz, constantes)
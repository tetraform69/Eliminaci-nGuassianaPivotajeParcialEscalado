function eliminacionGuassiana(matriz, constantes) {

    let n = constantes.length;

    /** 
     * Formateo de la matriz para tenerla de la siguiente forma:
     * 
     * A1 B1 C1 D1 | E1
     * A2 B2 C2 D2 | E2
     * A3 B3 C3 D3 | E3
     * A4 B4 C4 D4 | E4
     */
    matriz = matriz.map((row, index) => [...row, constantes[index]]);

    for (let i = 0; i < n - 1; i++) {
        // Se asegura que la fila tiene el mejor pivote
        matriz = pivoteoEscalado(matriz, i, n);

        // Eliminar elementos debajo del pivote
        for (let j = i + 1; j < n; j++) {
            let factorEscala = matriz[j][i] / matriz[i][i];
            for (let k = i; k <= n; k++) {
                matriz[j][k] = matriz[j][k] - factorEscala * matriz[i][k];
            }
        }
    }

    // Sustitución hacia atrás para encontrar la solución
    let resultado = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        resultado[i] = matriz[i][n] / matriz[i][i]
        for (let j = i - 1; j >= 0; j--) {
            matriz[j][n] -= matriz[j][i] * resultado[i];
        }
    }

    return resultado;
}

function pivoteoEscalado(matriz, index, n) {
    let maxColVal = 0;
    let bestRow = index;

    // Encontrar el mejor pivote considerando la escala
    for (let i = index; i < n; i++) {
        // Máximo valor de la fila
        let maxFilaVal = Math.max(...matriz[i].slice(0, n).map(Math.abs));
        // Valor escalado = valor absoluto del elemento dividido por el valor máximo en su fila
        let valorEscalado = Math.abs(matriz[i][index]) / maxFilaVal;
        // Asignar fila con mejor pivote y nuevo valor máximo de la columna
        if (valorEscalado > maxColVal) {
            maxColVal = valorEscalado;
            bestRow = i;
        }
    }

    // Cambiar filas por la del mejor pivote
    if (bestRow != index) {
        [matriz[index], matriz[bestRow]] = [matriz[bestRow], matriz[index]];
    }

    return matriz;
}

export default eliminacionGuassiana
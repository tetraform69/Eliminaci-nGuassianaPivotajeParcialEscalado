def eliminacionGuassiana(matriz, constantes):
    n = len(constantes)

    """
    Formateo de la matriz para tenerla de la siguiente forma:

    A1 B1 C1 D1 | E1
    A2 B2 C2 D2 | E2
    A3 B3 C3 D3 | E3
    A4 B4 C4 D4 | E4
    """
    for i in range(n):
        matriz[i].append(constantes[i])

    for i in range(n - 1):
        # Se asegura que la fila tiene el mejor pivote
        matriz = pivoteoEscalado(matriz, i, n)

        # Eliminar elementos debajo del pivote
        for j in range(i + 1, n):
            factor_escala = matriz[j][i] / matriz[i][i]
            for k in range(i, n + 1):
                matriz[j][k] -= factor_escala * matriz[i][k]

    # Sustitución hacia atrás para encontrar la solución
    resultado = [0 for _ in range(n)]
    for i in range(n - 1, -1, -1):
        resultado[i] = matriz[i][n] / matriz[i][i]
        for j in range(i - 1, -1, -1):
            matriz[j][n] -= matriz[j][i] * resultado[i]

    return resultado

def pivoteoEscalado(matriz, index, n):
    max_col_val = 0
    best_row = index

    # Encontrar el mejor pivote considerando la escala
    for i in range(index, n):
        max_fila_val = max(abs(x) for x in matriz[i][:n])
        valor_escalado = abs(matriz[i][index]) / max_fila_val
        if valor_escalado > max_col_val:
            max_col_val = valor_escalado
            best_row = i

    # Intercambiar filas si es necesario
    if best_row != index:
        matriz[index], matriz[best_row] = matriz[best_row], matriz[index]

    return matriz

matriz = [
    [ 1,  2, -1,  3],
    [ 2,  3,  0, -1],
    [ 3, -1,  2,  2],
    [-1,  4, -2,  1],
]

constantes = [4, 5, 6, 7]

result = eliminacionGuassiana(matriz, constantes)

print(result)
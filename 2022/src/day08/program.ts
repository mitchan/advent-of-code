import { INPUT } from './input';

export function run(): [number, number] {
    const matrix = getMatrix();

    let count = 0;

    // add first and last row size
    count += matrix[0].length;
    count += matrix[matrix.length - 1].length;

    // add first column and last column (-2)
    count += 2 * (matrix.length - 2);

    // loop over rows and stop at the second to last
    for (let i = 1; i < matrix.length - 1; i++) {
        const currentValues = matrix[i];

        // skip external trees
        for (let j = 1; j < currentValues.length - 1; j++) {
            // check visible hor
            if (isVisibleHor(currentValues, j)) {
                count++;
                continue;
            }

            // check visible vertically
            if (isVisibleVer(matrix, i, j)) {
                count++;
            }
        }
    }

    return [count, getBestTreeScore(matrix)];
}

function getMatrix(): number[][] {
    const rows = INPUT.split('\n');

    const matrix: number[][] = [];

    rows.forEach((r) => {
        const values = r.split('').map(Number);
        matrix.push(values);
    });

    return matrix;
}

function isVisibleHor(values: number[], i: number): boolean {
    if (i === 0 || i === values.length - 1) {
        // external trees, skip
        return false;
    }

    const curr = values[i];

    const maxBefore = Math.max(...values.slice(0, i));
    if (maxBefore < curr) {
        // visible from left
        return true;
    }

    const maxAfter = Math.max(...values.slice(i + 1));
    if (maxAfter < curr) {
        // visible from right
        return true;
    }

    return false;
}

function isVisibleVer(
    matrix: number[][],
    rowIndex: number,
    colIndex: number,
): boolean {
    const curr = matrix[rowIndex][colIndex];
    const columnValues = matrix.map((row) => row[colIndex]);

    const maxBefore = Math.max(...columnValues.slice(0, rowIndex));
    if (maxBefore < curr) {
        return true;
    }

    const maxAfter = Math.max(...columnValues.slice(rowIndex + 1));
    if (maxAfter < curr) {
        return true;
    }

    return false;
}

function getBestTreeScore(matrix: number[][]): number {
    let score = 0;

    // skip first and last rows
    for (let i = 1; i < matrix.length - 1; i++) {
        const currentRow = matrix[i];

        for (let j = 1; j < currentRow.length - 1; j++) {
            const eastScore = getEastScore(currentRow, j);
            const westScore = getWestScore(currentRow, j);
            const northScore = getNorthScore(matrix, i, j);
            const southScore = getSouthScore(matrix, i, j);

            score = Math.max(
                score,
                eastScore * westScore * northScore * southScore,
            );
        }
    }

    return score;
}

function getEastScore(row: number[], colIndex: number): number {
    const value = row[colIndex];
    let score = 0;
    for (let i = colIndex + 1; i < row.length; i++) {
        score++;
        if (row[i] >= value) {
            break;
        }
    }

    return score;
}

function getWestScore(row: number[], colIndex: number): number {
    const value = row[colIndex];
    let score = 0;
    for (let i = colIndex - 1; i >= 0; i--) {
        score++;
        if (row[i] >= value) {
            break;
        }
    }

    return score;
}

function getNorthScore(
    matrix: number[][],
    rowIndex: number,
    colIndex: number,
): number {
    const value = matrix[rowIndex][colIndex];

    let score = 0;
    for (let i = rowIndex - 1; i >= 0; i--) {
        score++;
        const rowValue = matrix[i][colIndex];
        if (rowValue >= value) {
            break;
        }
    }

    return score;
}

function getSouthScore(
    matrix: number[][],
    rowIndex: number,
    colIndex: number,
): number {
    const value = matrix[rowIndex][colIndex];

    let score = 0;
    for (let i = rowIndex + 1; i < matrix.length; i++) {
        score++;
        const rowValue = matrix[i][colIndex];
        if (rowValue >= value) {
            break;
        }
    }

    return score;
}

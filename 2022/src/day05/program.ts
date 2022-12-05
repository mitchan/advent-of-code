import { INPUT } from './input';

export function run(): [string, string] {
    const rows = INPUT.split('\n');

    return [getResult(rows), getResult(rows, false)];
}

function getResult(rows: string[], reverse = true): string {
    const matrix = getMatrix(rows);

    const moveRows = rows.filter((row) => row.startsWith('move '));
    moveRows.forEach((row) => {
        const split = row.split(' ');

        const toMove = Number(split[1]);
        const moveFrom = Number(split[3]) - 1;
        const moveTo = Number(split[5]) - 1;

        const stack = matrix[moveFrom];

        // remove elements
        const removed = stack.splice(stack.length - toMove, stack.length);

        // add elements
        matrix[moveTo].push(...(reverse ? removed.reverse() : removed));
    });

    return matrix.map((arr) => arr[arr.length - 1]).join('');
}

function getMatrix(rows: string[]): string[][] {
    const matrix: string[][] = [];

    const boxRows = rows.filter((row) => row.includes('['));
    boxRows.forEach((row) => {
        for (let i = 1; i <= row.length; i = i + 4) {
            const char = row[i];
            if (char === ' ') {
                continue;
            }

            const index = (i - 1) / 4;

            if (!Array.isArray(matrix[index])) {
                matrix[index] = [];
            }
            matrix[index].push(char);
        }
    });

    matrix.forEach((row) => row.reverse());

    return matrix;
}

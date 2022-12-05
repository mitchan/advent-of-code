import { INPUT } from './input';

// generate array of "values"
const values: string[] = [];
for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    values.push(String.fromCharCode(i));
}
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    values.push(String.fromCharCode(i));
}

function getValue(row: string): number {
    const split = row.split('');

    const middle = split.length / 2;
    const content1 = split.slice(0, middle);
    const content2 = split.slice(middle);

    const includedInBoth = [
        ...new Set(content1.filter((v) => content2.includes(v))),
    ];

    const sum = includedInBoth.reduce((acc, v) => {
        const index = values.indexOf(v) + 1;
        return acc + index;
    }, 0);

    return sum;
}

function getGroup(rows: string[]): string {
    const [row1, row2, row3] = rows;

    const split2 = [...new Set(row2.split(''))];
    const split3 = [...new Set(row3.split(''))];

    const found = row1
        .split('')
        .find((v) => split2.includes(v) && split3.includes(v));

    if (!found) {
        throw new Error(`cannot find common value in ${rows}`);
    }

    return found;
}

export function run(): [number, number] {
    const rows = INPUT.split('\n');

    let part2Rows: string[] = [];
    const part2Groups: string[] = [];

    const value = rows.reduce((acc, row, index) => {
        // part 2
        part2Rows.push(row);
        if (part2Rows.length === 3) {
            part2Groups.push(getGroup(part2Rows));
            part2Rows = [];
        }

        // part 1
        const sum = getValue(row);
        return acc + sum;
    }, 0);

    const part2Value = part2Groups.reduce((acc, v) => {
        return acc + values.indexOf(v) + 1;
    }, 0);

    return [value, part2Value];
}

import { INPUT } from './input';

const rows = INPUT.split('\n');

export function getCalories() {
    const acc: number[] = [];

    rows.reduce((acc, row) => {
        if (row === '') {
            acc.push(0);
        } else {
            acc[acc.length - 1] += Number(row);
        }
        return acc;
    }, acc);

    acc.sort((n1, n2) => n2 - n1);

    return [acc[0], acc[0] + acc[1] + acc[2]];
}

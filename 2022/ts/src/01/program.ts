import { INPUT } from './input';

const rows = INPUT.split('\n');

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

console.log(`The elf with the most calories: ${acc[0]}`);

console.log(`The sum of the first 3 elves: ${acc[0] + acc[1] + acc[2]}`);

// console.log(acc);

// console.log(Math.max(...acc));

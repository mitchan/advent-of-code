import { INPUT } from './input';

export function run(): [number, number] {
    const rows = INPUT.split('\n');

    let notOverlapCount = 0;
    const value = rows.reduce((acc, row) => {
        const pairs = row.split(',');

        const pair1 = pairs[0].split('-').map(Number);
        const pair2 = pairs[1].split('-').map(Number);

        // part2
        if (pair2[0] > pair1[1] || pair2[1] < pair1[0]) {
            notOverlapCount++;
        }

        // part1
        if (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) {
            // pair1 is included in pair2
            return acc + 1;
        } else if (pair2[0] >= pair1[0] && pair2[1] <= pair1[1]) {
            // pair2 is included in pair1
            return acc + 1;
        }

        // not included
        return acc;
    }, 0);

    return [value, rows.length - notOverlapCount];
}

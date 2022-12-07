import { INPUT } from './input';

const TOTAL_SPACE = 70000000;

export function run(): [number, number] {
    const rows = INPUT.split('\n');

    const dirSizes: Record<string, number> = {};

    let currentPath = ['/'];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row === '$ ls') {
            const lsRows: string[] = [];

            // find the next command index, if present
            let j = i + 1;
            for (; j < rows.length; j++) {
                const currentRow = rows[j];

                // update i
                i = j - 1;

                if (!currentRow.startsWith('$')) {
                    lsRows.push(currentRow);
                } else {
                    break;
                }
            }

            lsRows.forEach((row) => {
                if (row.startsWith('dir')) {
                    return;
                }
                const [size] = row.split(' ');

                let path = '';
                for (let p of currentPath) {
                    path += `${p}${p !== '/' ? '/' : ''}`;
                    if (!dirSizes[path]) {
                        dirSizes[path] = 0;
                    }
                    dirSizes[path] += Number(size);
                }
            });

            if (j === rows.length) {
                i = j;
            }
        } else if (row.startsWith('$ cd')) {
            const split = row.split(' ');
            const folder = split[2];

            if (folder === '..') {
                // go back
                currentPath.pop();
            } else if (folder === '/') {
                currentPath = ['/'];
            } else {
                currentPath.push(folder);
            }
        } else {
            throw new Error(`invalid command: ${row}`);
        }
    }

    const sum = Object.values(dirSizes)
        .filter((v) => v < 100000)
        .reduce((acc, v) => acc + v, 0);

    // part 2
    const toClean = 30000000 - (TOTAL_SPACE - dirSizes['/']);
    const [toDelete] = Object.values(dirSizes)
        .filter((v) => v >= toClean)
        .sort((v1, v2) => v1 - v2);

    return [sum, toDelete];
}

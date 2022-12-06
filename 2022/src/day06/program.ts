import { INPUT } from './input';

export function run(): [number, number] {
    const chars = INPUT.split('');

    return [getIndex(chars), getIndex(chars, 14)];
}

function getIndex(input: string[], length = 4): number {
    for (let i = 0; i <= input.length - length; i++) {
        const slice = [...new Set(input.slice(i, i + length))];

        if (slice.length === length) {
            return i + length;
        }
    }

    return -1;
}

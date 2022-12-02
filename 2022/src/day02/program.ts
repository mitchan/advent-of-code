import { INPUT } from './input';

// A - X: Rock
// B - Y: Paper
// C - Z: Scissors
type P1_SCORE = {
    A: number;
    B: number;
    C: number;
};

const p1_score = {
    A: 1,
    B: 2,
    C: 3,
};

type P2_SCORE = {
    X: number;
    Y: number;
    Z: number;
};

const p2_score: P2_SCORE = {
    X: 1,
    Y: 2,
    Z: 3,
};

enum Result {
    LOSE = 0,
    DRAW = 3,
    WIN = 6,
}

const rows = INPUT.split('\n');

// PART 1
function mapP1choice(choise: string) {
    if (choise === 'A') {
        return 'X';
    } else if (choise === 'B') {
        return 'Y';
    } else if (choise === 'C') {
        return 'Z';
    }

    throw new Error(`Invalid choise: ${choise}`);
}

function getResult(p1: string, p2: string): Result {
    const p1Choise = mapP1choice(p1);

    if (p2 === p1Choise) {
        // DRAW
        return Result.DRAW;
    }

    const p1Score = p2_score[p1Choise];
    const p2Score = p2_score[p2 as keyof P2_SCORE];
    const diff = p2Score - p1Score;

    switch (diff) {
        case 1:
        case -2:
            return Result.WIN;
    }

    return Result.LOSE;
}

export function getScores() {
    const splittedRows = rows.map((row) => row.split(' '));

    const score = splittedRows.reduce((acc, [p1, p2]) => {
        const result = getResult(p1, p2);

        return acc + result + p2_score[p2 as keyof P2_SCORE];
    }, 0);

    // PART 2
    const newScore = splittedRows.reduce((acc, [p1, p2]) => {
        if (p2 === 'X') {
            // LOSE
            const myChoise = p1_score[p1 as keyof P1_SCORE] - 1;
            return acc + Result.LOSE + (myChoise === 0 ? 3 : myChoise);
        } else if (p2 === 'Y') {
            // DRAW (+)
            const myChoise = p1_score[p1 as keyof P1_SCORE];
            return acc + Result.DRAW + myChoise;
        } else {
            // WIN
            const myChoise = p1_score[p1 as keyof P1_SCORE] + 1;
            return acc + Result.WIN + (myChoise === 4 ? 1 : myChoise);
        }
    }, 0);

    return [score, newScore];
}

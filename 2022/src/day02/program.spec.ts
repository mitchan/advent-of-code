import { expect, it } from '@jest/globals';
import { getScores } from './program';

it('returns the expected values', () => {
    const [score1, score2] = getScores();

    expect(score1).toBe(11666);
    expect(score2).toBe(12767);
});

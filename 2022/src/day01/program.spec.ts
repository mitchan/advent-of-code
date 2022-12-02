import { expect, it } from '@jest/globals';
import { getCalories } from './program';

it('returns the expected values', () => {
    const [c1, c2] = getCalories();

    expect(c1).toBe(68467);
    expect(c2).toBe(203420);
});

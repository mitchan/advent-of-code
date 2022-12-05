import { expect, it } from '@jest/globals';
import { run } from './program';

it('returns the expected values', () => {
    const [value, part2Value] = run();
    expect(value).toBe('TPGVQPFDH');
    expect(part2Value).toBe('DMRDFRHHH');
});

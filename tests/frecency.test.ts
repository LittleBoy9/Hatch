import { describe, it, expect } from 'vitest';
import { calculateFrecencyScore } from '../src/storage/frecency';

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe('calculateFrecencyScore', () => {
  it('weights usage within the last hour at 1.0', () => {
    const score = calculateFrecencyScore({ count: 10, lastUsed: Date.now() - 30 * MIN });
    expect(score).toBe(10);
  });

  it('weights usage within the last day at 0.8', () => {
    const score = calculateFrecencyScore({ count: 10, lastUsed: Date.now() - 5 * HOUR });
    expect(score).toBeCloseTo(8);
  });

  it('weights usage within the last week at 0.5', () => {
    const score = calculateFrecencyScore({ count: 10, lastUsed: Date.now() - 3 * DAY });
    expect(score).toBeCloseTo(5);
  });

  it('weights older usage at 0.2', () => {
    const score = calculateFrecencyScore({ count: 10, lastUsed: Date.now() - 30 * DAY });
    expect(score).toBeCloseTo(2);
  });

  it('scales with count', () => {
    const lastUsed = Date.now() - 10 * MIN;
    const low = calculateFrecencyScore({ count: 1, lastUsed });
    const high = calculateFrecencyScore({ count: 100, lastUsed });
    expect(high).toBeGreaterThan(low);
    expect(high).toBe(100 * low);
  });
});

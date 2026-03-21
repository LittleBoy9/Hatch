import type { FrecencyEntry } from '../types';

function sendMessage<T>(msg: unknown): Promise<T> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (response: T) => resolve(response));
  });
}

/**
 * Track a command execution for frecency scoring.
 */
export function trackCommandUsage(commandId: string): void {
  sendMessage({ type: 'TRACK_USAGE', commandId });
}

/**
 * Calculate frecency score for a command.
 * Score = count * recency_weight
 *   - Last hour:  weight 1.0
 *   - Today:      weight 0.8
 *   - This week:  weight 0.5
 *   - Older:      weight 0.2
 */
export function calculateFrecencyScore(entry: FrecencyEntry): number {
  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;
  const elapsed = Date.now() - entry.lastUsed;

  let recencyWeight: number;
  if (elapsed < hourMs) {
    recencyWeight = 1.0;
  } else if (elapsed < dayMs) {
    recencyWeight = 0.8;
  } else if (elapsed < weekMs) {
    recencyWeight = 0.5;
  } else {
    recencyWeight = 0.2;
  }

  return entry.count * recencyWeight;
}

/**
 * Get all frecency data from storage.
 */
export async function getFrecencyData(): Promise<Record<string, FrecencyEntry>> {
  return sendMessage<Record<string, FrecencyEntry>>({ type: 'GET_FRECENCY' });
}

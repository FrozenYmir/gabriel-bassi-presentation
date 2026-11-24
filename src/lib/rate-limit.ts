const windowStore = new Map<string, number[]>();

export function checkRateLimit(key: string, maxRequests = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (windowStore.get(key) || []).filter((ts) => now - ts < windowMs);

  if (timestamps.length >= maxRequests) {
    windowStore.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  windowStore.set(key, timestamps);
  return true;
}

import { SimpleTradingClientException } from '@stefan8893/simple-trading-client';

export function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

export function isSimpleTradingClientException(
  candidate: unknown,
): candidate is SimpleTradingClientException {
  return SimpleTradingClientException.isSimpleTradingClientException(candidate);
}

export function vibrate(durationInMs: number) {
  if ('vibrate' in navigator) {
    navigator.vibrate(durationInMs);
  }
}

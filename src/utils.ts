import { SimpleTradingClientException } from '@stefan8893/simple-trading-client';
import { isDate as isDateFn } from 'date-fns';

export function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

export function isDate(candidate: unknown): candidate is Date {
  return isDateFn(candidate);
}

export function isSimpleTradingClientException(
  candidate: unknown,
): candidate is SimpleTradingClientException {
  return SimpleTradingClientException.isSimpleTradingClientException(candidate);
}

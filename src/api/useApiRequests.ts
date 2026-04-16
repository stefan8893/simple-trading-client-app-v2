import { SimpleTradingClient } from '@stefan8893/simple-trading-client';
import { composeMiddlewareRunner } from '../middlewares/middleware';
import { createLoadingMiddleware, type LoaderOptions } from './middlewares/loadingMiddleware';
import { createUnauthenticatedMiddleware } from './middlewares/unauthenticatedMiddleware';

export function useApiRequests (options: LoaderOptions = {}) {
  const { loadingMiddleware, isLoading } = createLoadingMiddleware(options);
  const { unauthenticatedMiddleware } = createUnauthenticatedMiddleware();

  const { isRunning, run } = composeMiddlewareRunner([
    loadingMiddleware,
    unauthenticatedMiddleware,
  ]);

  const apiClient = new SimpleTradingClient('/');

  return {
    isLoading,
    isRunning,
    run,
    apiClient,
  };
}

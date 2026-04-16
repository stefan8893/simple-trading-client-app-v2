import type { ActionFn, Middleware, Result } from '../../middlewares/middleware';
import { ProblemDetails } from '@stefan8893/simple-trading-client';
import { isSimpleTradingClientException } from '@/utils';

export function createUnauthenticatedMiddleware () {
  const unauthenticatedMiddleware: Middleware = async <R>(
    action: ActionFn<R>,
    next: ActionFn<R>,
  ): Promise<Result<R>> => {
    const result = await next();
    if (result.state === 'failure'
      && ((isSimpleTradingClientException(result.error) && result.error.status === 401)
        || (result.error instanceof ProblemDetails && result.error.status == 401))
    ) {
      console.error('Unauthenticated error detected in unauthenticatedMiddleware', result.error);
    }

    return result;
  };

  return {
    unauthenticatedMiddleware,
  };
}

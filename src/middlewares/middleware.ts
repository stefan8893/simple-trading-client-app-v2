import { computed, ref } from 'vue';

export type SuccessResult<R> = {
  state: 'success';
  value: R;
};

export type FailedResult = {
  state: 'failure';
  error: unknown;
};

export type Result<R> = SuccessResult<R> | FailedResult;

export type ActionFn<R> = () => Promise<Result<R>>;

export type Middleware = <R>(next: ActionFn<R>) => Promise<Result<R>>;

export function composeMiddlewareRunner(middlewares: Middleware[]) {
  const isRunningCount = ref(0);
  const isRunning = computed(() => isRunningCount.value > 0);

  const run = async <R>(action: () => Promise<R>): Promise<Result<R>> => {
    isRunningCount.value++;
    const liftedAction = async (): Promise<Result<R>> => {
      try {
        return { state: 'success', value: await action() };
      } catch (error) {
        return { state: 'failure', error };
      }
    };

    const composed = middlewares.reduceRight(
      (next, middleware) => () => middleware(next),
      liftedAction,
    );

    try {
      return await composed();
    } finally {
      isRunningCount.value--;
    }
  };

  return {
    isRunning,
    run,
  };
}

import type { ActionFn, Middleware, Result } from '../../middlewares/middleware';
import { type Ref, ref } from 'vue';

export type LoaderOptions = {
  loadingStartDelay?: number
  skipLoadingStartDelayOnFirstRun?: boolean
  initialLoading?: boolean
};

export function createLoadingMiddleware (options: LoaderOptions = {}) {
  const {
    loadingStartDelay = 200,
    initialLoading = false,
    skipLoadingStartDelayOnFirstRun = false,
  } = options;

  const isLoading: Ref<boolean> = ref(initialLoading);
  let runningCount = 0;
  let hasRun = false;
  let delayHandle: ReturnType<typeof setTimeout> | null = null;

  const startLoading = () => {
    if (!isLoading.value) {
      isLoading.value = true;
    }
  };

  const stopLoading = () => {
    runningCount--;
    if (runningCount <= 0) {
      runningCount = 0;
      if (delayHandle) {
        clearTimeout(delayHandle);
        delayHandle = null;
      }
      isLoading.value = false;
    }
  };

  const loadingMiddleware: Middleware = async <R>(
    action: ActionFn<R>,
    next: ActionFn<R>,
  ): Promise<Result<R>> => {
    runningCount++;

    const delay = !hasRun && skipLoadingStartDelayOnFirstRun ? 0 : (loadingStartDelay ?? 0);
    hasRun = true;

    if (delay > 0) {
      delayHandle = setTimeout(() => {
        startLoading();
        delayHandle = null;
      }, delay);
    } else {
      startLoading();
    }

    try {
      return await next();
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading,
    loadingMiddleware,
  };
}

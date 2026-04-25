import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSwipeStore = defineStore('swipe', () => {
  const swipeRightEnabled = ref(true);

  return {
    swipeRightEnabled,
  };
});

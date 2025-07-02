export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  const counter = computed(() => count.value);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = 0;
  };

  return {
    counter,
    increment,
    decrement,
    reset
  };
});

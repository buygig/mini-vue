
export let activeEffect: Function | null;

export function watchEffect(effect: Function) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

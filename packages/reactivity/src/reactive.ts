import { activeEffect } from './effect'
class Dep {
  #subscribes: Set<Function> = new Set();
  depend() {
    if (activeEffect) {
      this.#subscribes.add(activeEffect)
    }
  }
  notify() {
    this.#subscribes.forEach(effect => {
      effect()
    })
  }
}
const targetMap = new WeakMap()

function getDep(target: object, key: string | symbol) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep;
}

const handler: ProxyHandler<any> = {
  get(target, key, receiver) {
    const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key)
    const result = Reflect.set(target, key, value, receiver)
    dep.notify()
    return result
  }
}

export function reactive<T extends object>(target: T) {
  return new Proxy(target, handler)
}
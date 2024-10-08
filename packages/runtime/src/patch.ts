import { mount } from "./mount";
import type { VNode } from './vnode';

export function patch(n1: VNode, n2: VNode) {
  if (n1.tag === n2.tag) {
    const el = n2.el = n1.el;

    // update props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const oldVal = oldProps[key];
      const newVal = newProps[key];
      if (newVal !== oldVal) {
        el.setAttribute(key, newVal);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }
    // update children
    const oldChildren = n1.children;
    const newChildren = n2.children;
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = newChildren;
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = '';
        (newChildren as VNode[]).forEach((child: VNode) => {
          mount(child, el);
        })
      } else {
        const commonLength = Math.min((oldChildren as VNode[]).length, (newChildren as VNode[]).length)
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i] as VNode, newChildren[i] as VNode);
        }
        if (newChildren.length > oldChildren.length) {
          (newChildren.slice(oldChildren.length) as VNode[]).forEach((child: VNode) => {
            mount(child, el);
          })
        } else if (newChildren.length < oldChildren.length) {
          (oldChildren.slice(newChildren.length) as VNode[]).forEach((child: VNode) => {
            el.removeChild(child.el);
          })
        }
      }
    }
  } else {
    // replace n1 with n2
  }
}
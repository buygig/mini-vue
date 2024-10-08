import type { VNode } from './vnode';
export function mount(vnode: VNode, container: Element) {
  const el = vnode.el = document.createElement(vnode.tag);
  // props
  if ("props" in vnode) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // children
  if ("children" in vnode) {
    if (typeof vnode.children === 'string' || typeof vnode.children === 'number') {
      el.textContent = String(vnode.children);
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child: VNode | string | number) => {
        if (typeof child === 'object') {
          mount(child, el);
        } else {
          el.textContent = String(child);
        }
      });
    }
  }
  container.appendChild(el);
} 
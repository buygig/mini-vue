import type { VNode } from './vnode';
export function mount(vnode: VNode, container: Element) {
  const el = vnode.el = document.createElement(vnode.tag);
  // props
  if (vnode.props) {
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
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children;
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child: VNode | string) => {
        if (typeof child === 'object') {
          mount(child, el);
        } else {
          el.textContent = child;
        }
      });
    }
  }
  container.appendChild(el);
} 
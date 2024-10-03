interface Props {
  [key: string]: any;
}

export type VNode = {
  el: HTMLElement;
  tag: string;
  props?: Props | null;
  children?: string | Array<VNode | string>;
}

export function h(tag: string, props: Props | null, children: string | Array<VNode | string>): VNode {
  return {
    el: document.createElement(tag),
    tag,
    props,
    children,
  }
}


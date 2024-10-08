interface Props {
  [key: string]: any;
}

export type VNode = {
  el: HTMLElement;
  tag: string;
  props?: Props | null;
  children?: string | number | Array<VNode | string | number>;
}

export function h(tag: string, props?: Props | null, children?: string | Array<VNode | string | number>): VNode {
  if (typeof tag !== "string") {
    throw new Error("tag must be a string")
  }
  const el = document.createElement(tag)
  return {
    el,
    tag,
    props: props || null,
    children,
  }
}


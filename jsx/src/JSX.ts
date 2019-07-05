import { AnyEZElement, EZElement } from '@ez-elements/core';

type Constructable<T, A> = {
  new (attributes: A): T;
};

type JSXChild = { element: HTMLElement } | AnyEZElement | HTMLElement | string;

/** @internal */
export class JSX {
  static createElement<T extends keyof HTMLElementTagNameMap, A extends {}>(
    arg:
      | T
      | ((attributes: A) => T)
      | Constructable<HTMLElementTagNameMap[T] | EZElement<T>, A>,
    attributes?: A,
    ...children: Array<JSXChild>
  ): EZElement<T> {
    let el: EZElement<T>;
    if (typeof arg === 'function') {
      const constructed = new (arg as any)(attributes);
      if (EZElement.isEZElement(constructed)) {
        el = constructed as EZElement<T>;
      } else {
        el = new EZElement(constructed);
      }
    } else {
      el = new EZElement(arg);
      if (attributes !== undefined && attributes !== null) {
        Object.entries(attributes).forEach(([attrName, attrVal]) => {
          if (attrName === 'style' && typeof attrVal !== 'string') {
            el.addStyles(attrVal as Partial<CSSStyleDeclaration>);
          } else if (attrName === 'onClick') {
            el.onClick(attrVal as () => void);
          } else {
            el.setAttribute(attrName, attrVal as string);
          }
        });
      }
    }
    el.append(...children);
    return el;
  }
}

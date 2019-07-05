import { AnyEZElement } from '@ez-elements/core';

export * from './JSX';

declare global {
  export namespace JSX {
    export type Element = AnyEZElement;
    export type ElementClass = AnyEZElement | HTMLElement;

    type IntrinsicElements = {
      [T in keyof HTMLElementTagNameMap]: (Omit<
        Partial<HTMLElementTagNameMap[T]>,
        'style'
      > & {
        style?: Partial<CSSStyleDeclaration> | string;
        onClick?: (event: MouseEvent) => void;
      });
    };
  }
}

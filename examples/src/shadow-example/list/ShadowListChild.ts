import { ListChild } from './FilterableStaticList';
import { EZShadowElement } from '@ez-elements/shadow';
import { EZSpan } from '@ez-elements/core';
import { extractStyleContents } from '@ez-elements/shadow';

const css = extractStyleContents(`<style>
  :host {
      color: red;
  }
</style>`);

// Simple div with a classname from the list implementation class file
export class ShadowListChild extends EZShadowElement<'div'>
  implements ListChild {
  private text: string;
  private span: EZSpan;
  private disconnects: number = 0;
  private connects: number = 0;

  constructor(text: string) {
    super('div');
    this.text = text;

    this.setShadowStyle(css).append((this.span = new EZSpan()));

    this.onConnected(() => {
      this.connects++;
      this.render();
    });

    this.onDisconnected(() => {
      this.disconnects++;
      this.render();
    });

    this.render();
  }

  getQueryText(): string {
    return this.text;
  }

  private render() {
    this.span.setTextContent(
      `${this.text} - connects: ${this.connects} - disconnects: ${this.disconnects}`
    );
  }
}

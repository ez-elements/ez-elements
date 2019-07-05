import { EZElement } from '@ez-elements/core';

/** @internal */
export class EZButton extends EZElement<'button'> {
  constructor(cb: () => void) {
    super('button');
    this.onClick(cb);
  }

  disable() {
    this.setAttribute('disabled', 'disabled');
    return this;
  }

  enable() {
    this.removeAttribute('disabled');
    return this;
  }
}

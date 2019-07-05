import { EZElement } from '@ez-elements/core';

/** @internal */
export class EZTextInput extends EZElement<'input'> {
  constructor(cb: (value: string) => void) {
    super('input');

    this.setAttribute('type', 'text').addEventListener('input', () => {
      cb(this.getValue());
    });
  }

  public getValue(): string {
    return this.getNativeElement().value;
  }

  public setValue(value: string, callChangedCallback: boolean = true): this {
    this.getNativeElement().value = value;
    if (callChangedCallback) {
      this.getNativeElement().dispatchEvent(new Event('input'));
    }
    return this;
  }
}

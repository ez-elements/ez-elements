import { ez, EZDiv } from '@ez-elements/core';
import { extractStyleContents, EZShadowElement } from '@ez-elements/shadow';

const enabledClassName = 'enabled';
const style = extractStyleContents(`<style>
  :host {
    border: 1px solid black;
    background-color: red;
    display: block;
    padding: 5px;
  }
  :host(.${enabledClassName}) {
    background-color: green;
    color: white;
  }
</style>`);

export class StatusElement extends EZShadowElement<'div'> {
  private status: EZDiv;

  constructor(private enabled: boolean = false) {
    super('div');

    this.setShadowStyle(style)
      .append((this.status = ez('div')))
      .render();
  }

  disable(): this {
    this.enabled = false;
    this.render();
    return this;
  }

  enable(): this {
    this.enabled = true;
    this.render();
    return this;
  }

  render(): this {
    this.status.setTextContent(this.enabled ? 'Enabled' : 'Disabled');
    this.setClasses({
      [enabledClassName]: this.enabled
    });
    return this;
  }
}

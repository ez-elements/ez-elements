import { EZElement, NativeElement } from '@ez-elements/core';
import { didRegisterCustomElement, InternalShadow } from './InternalShadow';

/** @internal */
export class EZShadowElement<K extends NativeElement> extends EZElement<keyof HTMLElementTagNameMap> {
  private styleElement: HTMLStyleElement;
  private onConnectedCallbacks: Array<() => void> = [];
  private onDisconnectedCallbacks: Array<() => void> = [];

  constructor(type: K) {
    super(new InternalShadow());

    const element = this.getNativeElement() as InternalShadow;
    element.setLifeCycleListener({
      connected: () => {
        this.connected();
      },
      disconnected: () => {
        this.disconnected();
      }
    });
    const shadowRoot = element.getShadowRoot();

    this.styleElement = document.createElement('style');
    shadowRoot.append(this.styleElement);

    const container = new EZElement(type);
    const containerElement = container.getNativeElement();
    shadowRoot.append(containerElement);

    this.setChildContainer(containerElement);
  }

  public onConnected(cb: () => void): this {
    this.onConnectedCallbacks.push(cb);
    return this;
  }

  public onDisconnected(cb: () => void): this {
    this.onDisconnectedCallbacks.push(cb);
    return this;
  }

  public setShadowStyle(styleContents: string): this {
    this.styleElement.innerHTML = styleContents;
    return this;
  }

  private connected() {
    this.onConnectedCallbacks.forEach(cb => {
      cb();
    });
  }

  private disconnected() {
    this.onDisconnectedCallbacks.forEach(cb => {
      cb();
    });
  }
}

if (!didRegisterCustomElement) {
  module.exports = {
    EZShadowElement: function() {
      throw new Error('customElements was not available so the custom element used by EZShadowElement cannot be constructed. This can occur if the environment does not support custom elements (either an old browser or a test environment that does not include support for custom elements');
    },
  };
}
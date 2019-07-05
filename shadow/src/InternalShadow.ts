export interface ShadowLifeCycleListener {
  connected(): void;
  disconnected(): void;
}

// Use a subclass of HTMLElement as the root element to capture lifecycle callbacks.
// To avoid common issues with transpilers erasing class / new keywords that are
// required for standard web component usage, use Reflect.construct and direct
// prototype definition.
function InternalShadowImpl() {
  const instance = Reflect.construct(
    HTMLElement,
    [],
    this.__proto__.constructor
  );
  instance.root = instance.attachShadow({ mode: 'open' });
  instance.append(instance.root);
  return instance;
}
InternalShadowImpl.prototype.setLifeCycleListener = function(
  lifecycleListener: ShadowLifeCycleListener
) {
  this.lifecycleListener = lifecycleListener;
  return this;
};
InternalShadowImpl.prototype.getShadowRoot = function() {
  return this.root;
};
InternalShadowImpl.prototype.connectedCallback = function() {
  this.lifecycleListener.connected();
};
InternalShadowImpl.prototype.disconnectedCallback = function() {
  this.lifecycleListener.disconnected();
};
Object.setPrototypeOf(InternalShadowImpl.prototype, HTMLElement.prototype);
Object.setPrototypeOf(InternalShadowImpl, HTMLElement);

declare class IInternalShadow extends HTMLElement {
  constructor();
  setLifeCycleListener(lifecycleListener: ShadowLifeCycleListener): this;
  getShadowRoot(): ShadowRoot;
}

interface InternalShadowClass {
  new (): IInternalShadow;
}

export const InternalShadow = (InternalShadowImpl as unknown) as InternalShadowClass;
export type InternalShadow = IInternalShadow;

// A tag is required for a custom HTMLElement.
// The internal shadow element will be visible as 'ez-shadow' in the DOM
customElements.define('ez-shadow', InternalShadow);

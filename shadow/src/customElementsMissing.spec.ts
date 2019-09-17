import { EZShadowElement } from './EZShadowElement';

describe('customElement missing', () => {
  // By default the customElements property is not defined and other tests for this package use the
  // document-register-element mock.

  it('should throw an error when attempting to construct an EZShadowElement', () => {
    expect(() => {
      new EZShadowElement('div');
    }).toThrowError('customElements was not available so the custom element used by EZShadowElement cannot be constructed. This can occur if the environment does not support custom elements (either an old browser or a test environment that does not include support for custom elements');
  });
});
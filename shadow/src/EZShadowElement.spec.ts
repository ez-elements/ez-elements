import { EZShadowElement } from './EZShadowElement';

describe('EZShadowElement', () => {
  afterEach(() => {
    document.body.childNodes.forEach(child => {
      document.body.removeChild(child);
    });
  });

  it('should construct a given HTML tag with a nested shadow root container', () => {
    const instance = new EZShadowElement('div');
    document.body.appendChild(instance.getNativeElement());

    expect(instance.getNativeElement()).toBeInstanceOf(HTMLElement);
    expect(instance.getNativeElement().shadowRoot).toBeTruthy();

    const someDiv = document.createElement('div');
    instance.append(someDiv);
    expect(instance.getChild(0)).toBe(someDiv);

    const childContainerParent = instance.getChildContainer().parentNode;
    expect(childContainerParent).toBeInstanceOf(ShadowRoot);
    expect((childContainerParent as ShadowRoot).host).toBe(
      instance.getNativeElement()
    );

    const allDocumentElements = Array.from(document.querySelectorAll('*'));
    // Expect attached div to not be present in the document - it is now in the shadow root
    expect(allDocumentElements.indexOf(someDiv)).toEqual(-1);
    expect(
      allDocumentElements.indexOf(instance.getNativeElement())
    ).toBeGreaterThanOrEqual(0);
  });

  describe('setShadowStyle', () => {
    it('should set the contents of the nested style tag', () => {
      const instance = new EZShadowElement('div');

      instance.setShadowStyle('div { color: red; }');
      expect(instance.getNativeElement().shadowRoot).toBeTruthy();
      expect(
        instance.getNativeElement().shadowRoot!.childNodes[0]
      ).toBeInstanceOf(HTMLStyleElement);
      expect(
        (instance.getNativeElement().shadowRoot!
          .childNodes[0] as HTMLStyleElement).innerHTML
      ).toEqual('div { color: red; }');
    });
  });

  describe('onConnected', () => {
    it('should call the callback when the element is attached to a document', () => {
      const instance = new EZShadowElement('div');
      const fn = jest.fn();
      instance.onConnected(fn);

      expect(fn).toBeCalledTimes(0);
      {
        document.body.appendChild(instance.getNativeElement());
        // TODO - the current jest/jsdom configuration does not call the lifecycle methods
        // on the custom element - invoke it directly
        (instance.getNativeElement() as any).connectedCallback();
      }
      expect(fn).toBeCalledTimes(1);
    });
  });

  describe('onDisconnected', () => {
    it('should call the callback when the element is removed from a document', () => {
      const instance = new EZShadowElement('div');
      const fn = jest.fn();
      instance.onDisconnected(fn);

      {
        document.body.appendChild(instance.getNativeElement());
        (instance.getNativeElement() as any).connectedCallback();
      }

      expect(fn).toBeCalledTimes(0);
      {
        document.body.appendChild(instance.getNativeElement());
        // TODO - the current jest/jsdom configuration does not call the lifecycle methods
        // on the custom element - invoke it directly
        (instance.getNativeElement() as any).disconnectedCallback();
      }
      expect(fn).toBeCalledTimes(1);
    });
  });
});

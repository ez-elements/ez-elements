import { EZElement } from './EZElement';
import { EZDiv } from './EZDiv';

describe('EZElement', () => {
  it('should construct with the specified tag', () => {
    const instance = new EZElement('div');
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
  });

  it('should construct with an existing element', () => {
    const existingDiv = document.createElement('div');
    const instance = new EZElement(existingDiv);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement()).toBe(existingDiv);
  });

  describe('isEZElement', () => {
    it('should correctly identify EZElements', () => {
      expect(EZElement.isEZElement(new EZDiv())).toBeTruthy();
      expect(EZElement.isEZElement(new EZElement('div'))).toBeTruthy();
      class SomeClass extends EZDiv {}
      expect(EZElement.isEZElement(new SomeClass())).toBeTruthy();

      expect(EZElement.isEZElement(document.createElement('div'))).toBeFalsy();
      expect(EZElement.isEZElement(null)).toBeFalsy();
      expect(EZElement.isEZElement({})).toBeFalsy();
      class AnotherClass {}
      expect(EZElement.isEZElement(new AnotherClass())).toBeFalsy();
    });
  });

  describe('appendTo', () => {
    it('should append to a HTMLElement', () => {
      const instance = new EZElement('div');
      const parent = document.createElement('div');
      const existingChild = document.createElement('span');
      parent.appendChild(existingChild);

      expect(instance.appendTo(parent)).toBe(instance);

      expect(parent.childNodes[1]).toBe(instance.getNativeElement());
      expect(instance.getParent()).toBe(parent);
    });

    it('should append to an EZElement', () => {
      const instance = new EZElement('div');
      const parent = new EZElement('div');
      const existingChild = document.createElement('span');
      parent.append(existingChild);

      expect(instance.appendTo(parent)).toBe(instance);

      expect(parent.getChild(1)).toBe(instance.getNativeElement());
      expect(instance.getParent()).toBe(parent.getNativeElement());
    });
  });

  describe('prependTo', () => {
    it('should prepend to a HTMLElement', () => {
      const instance = new EZElement('div');
      const parent = document.createElement('div');

      expect(instance.prependTo(parent)).toBe(instance);

      expect(parent.childNodes[0]).toBe(instance.getNativeElement());
      expect(instance.getParent()).toBe(parent);
    });

    it('should prepend to an EZElement', () => {
      const instance = new EZElement('div');
      const parent = new EZElement('div');

      expect(instance.prependTo(parent)).toBe(instance);

      expect(parent.getChild(0)).toBe(instance.getNativeElement());
      expect(instance.getParent()).toBe(parent.getNativeElement());
    });
  });

  describe('append', () => {
    it('should append HTMLElements', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      expect(instance.append(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(childOne.parentNode).toBe(instance.getNativeElement());

      const childTwo = document.createElement('div');
      expect(instance.append(childTwo)).toBe(instance);
      expect(instance.getChild(1)).toBe(childTwo);
      expect(childTwo.parentNode).toBe(instance.getNativeElement());
    });

    it('should append EZElements', () => {
      const instance = new EZElement('div');

      const childOne = new EZElement('div');
      expect(instance.append(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne.getNativeElement());
      expect(childOne.getParent()).toBe(instance.getNativeElement());

      const childTwo = new EZElement('div');
      expect(instance.append(childTwo)).toBe(instance);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(childTwo.getParent()).toBe(instance.getNativeElement());
    });

    it('should append strings', () => {
      const instance = new EZElement('div');

      const childOne = 'Foo';
      expect(instance.append(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBeInstanceOf(Text);
      expect(instance.getChild(0)!.textContent).toEqual('Foo');

      const childTwo = 'Bar';
      expect(instance.append(childTwo)).toBe(instance);
      expect(instance.getChild(1)).toBeInstanceOf(Text);
      expect(instance.getChild(1)!.textContent).toEqual('Bar');
    });

    it('should append objects that contain an element that is an HTMLElement', () => {
      const instance = new EZElement('div');

      const childOne = { element: document.createElement('div') };
      expect(instance.append(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne.element);
      expect(childOne.element.parentNode).toBe(instance.getNativeElement());

      const childTwo = { element: document.createElement('div') };
      expect(instance.append(childTwo)).toBe(instance);
      expect(instance.getChild(1)).toBe(childTwo.element);
      expect(childTwo.element.parentNode).toBe(instance.getNativeElement());
    });

    it('should append multiple compatible values', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(instance.append(childOne, childTwo, childThree, childFour)).toBe(
        instance
      );
      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);
    });

    it('should append nested arrays of compatible values', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.append(childOne, [childTwo, [childThree, childFour]])
      ).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);
    });

    it('should throw an error if passed incompatible values', () => {
      const instance = new EZElement('div');

      expect(() => instance.append(null as any)).toThrow(
        new Error('Unrecognized child argument')
      );
    });
  });

  describe('prepend', () => {
    it('should prepend HTMLElements', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      expect(instance.prepend(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(childOne.parentNode).toBe(instance.getNativeElement());

      const childTwo = document.createElement('div');
      expect(instance.prepend(childTwo)).toBe(instance);
      expect(instance.getChild(0)).toBe(childTwo);
      expect(childTwo.parentNode).toBe(instance.getNativeElement());

      expect(instance.getChild(1)).toBe(childOne);
    });

    it('should prepend EZElements', () => {
      const instance = new EZElement('div');

      const childOne = new EZElement('div');
      expect(instance.prepend(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne.getNativeElement());
      expect(childOne.getParent()).toBe(instance.getNativeElement());

      const childTwo = new EZElement('div');
      expect(instance.prepend(childTwo)).toBe(instance);
      expect(instance.getChild(0)).toBe(childTwo.getNativeElement());
      expect(childTwo.getParent()).toBe(instance.getNativeElement());

      expect(instance.getChild(1)).toBe(childOne.getNativeElement());
    });

    it('should prepend strings', () => {
      const instance = new EZElement('div');

      const childOne = 'Foo';
      expect(instance.prepend(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBeInstanceOf(Text);
      expect(instance.getChild(0)!.textContent).toEqual('Foo');

      const childTwo = 'Bar';
      expect(instance.prepend(childTwo)).toBe(instance);
      expect(instance.getChild(0)).toBeInstanceOf(Text);
      expect(instance.getChild(0)!.textContent).toEqual('Bar');

      expect(instance.getChild(1)!.textContent).toEqual('Foo');
    });

    it('should prepend objects that contain an element that is an HTMLElement', () => {
      const instance = new EZElement('div');

      const childOne = { element: document.createElement('div') };
      expect(instance.prepend(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne.element);
      expect(childOne.element.parentNode).toBe(instance.getNativeElement());

      const childTwo = { element: document.createElement('div') };
      expect(instance.prepend(childTwo)).toBe(instance);
      expect(instance.getChild(0)).toBe(childTwo.element);
      expect(childTwo.element.parentNode).toBe(instance.getNativeElement());

      expect(instance.getChild(1)).toBe(childOne.element);
    });

    it('should prepend nested arrays of compatible values', () => {
      const instance = new EZElement('div');

      const existingChild = document.createElement('div');
      instance.prepend(existingChild);

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.prepend(childOne, [childTwo, [childThree, childFour]])
      ).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);

      expect(instance.getChild(4)).toBe(existingChild);
    });
  });

  describe('getChild', () => {
    it('should return child elements for given indices', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = document.createElement('div');
      instance.append(childOne, childTwo);
      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo);
      expect(instance.getChild(2)).toBe(null);
    });
  });

  describe('getChildren', () => {
    it('should return the child elements', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = document.createElement('div');
      instance.append(childOne, childTwo);

      expect(instance.getChildren()).toEqual([childOne, childTwo]);
    });
  });

  describe('styles', () => {
    it('should expose the style property of the native element', () => {
      const instance = new EZElement('div');

      expect(instance.style).toBe(instance.getNativeElement().style);
    });

    describe('addStyles', () => {
      it('should add the specified style properties', () => {
        const instance = new EZElement('div');

        expect(
          instance.addStyles({
            backgroundColor: 'orange',
            color: 'green'
          })
        ).toBe(instance);

        expect(instance.getNativeElement().style.backgroundColor).toEqual(
          'orange'
        );
        expect(instance.getNativeElement().style.color).toEqual('green');
      });
    });
  });

  describe('classes', () => {
    it('should expose the classList property of the native element', () => {
      const instance = new EZElement('div');

      expect(instance.classList).toBe(instance.getNativeElement().classList);
    });

    describe('addClass', () => {
      it('should add the specified classes', () => {
        const instance = new EZElement('div');

        expect(instance.addClass('foo', 'bar')).toBe(instance);

        expect(
          instance.getNativeElement().classList.contains('foo')
        ).toBeTruthy();
        expect(
          instance.getNativeElement().classList.contains('bar')
        ).toBeTruthy();
      });
    });

    describe('setClasses', () => {
      it('should set the specified classes based on the boolean values', () => {
        const instance = new EZElement('div');
        instance.getNativeElement().classList.add('foo', 'bar');
        expect(
          instance.getNativeElement().classList.contains('foo')
        ).toBeTruthy();
        expect(
          instance.getNativeElement().classList.contains('bar')
        ).toBeTruthy();

        expect(
          instance.setClasses({
            foo: false, // was present - remove
            bar: true, // was present - keep
            baz: true, // was not present - add
            qux: false // was not present - do not add
          })
        ).toBe(instance);

        expect(
          instance.getNativeElement().classList.contains('foo')
        ).toBeFalsy();
        expect(
          instance.getNativeElement().classList.contains('bar')
        ).toBeTruthy();
        expect(
          instance.getNativeElement().classList.contains('baz')
        ).toBeTruthy();
        expect(
          instance.getNativeElement().classList.contains('qux')
        ).toBeFalsy();
      });
    });

    describe('removeClass', () => {
      it('should remove the specified attribute', () => {
        const instance = new EZElement('div');
        instance.addClass('foo', 'bar');
        expect(
          instance.getNativeElement().classList.contains('foo')
        ).toBeTruthy();
        expect(
          instance.getNativeElement().classList.contains('bar')
        ).toBeTruthy();

        expect(instance.removeClass('foo', 'bar')).toBe(instance);

        expect(
          instance.getNativeElement().classList.contains('foo')
        ).toBeFalsy();
        expect(
          instance.getNativeElement().classList.contains('bar')
        ).toBeFalsy();
      });
    });
  });

  describe('attributes', () => {
    it('should expose the attributes property of the native element', () => {
      const instance = new EZElement('div');

      expect(instance.attributes).toBe(instance.getNativeElement().attributes);
    });

    describe('addAttributes', () => {
      it('should add the specified attributes', () => {
        const instance = new EZElement('div');

        expect(
          instance.addAttributes({
            attrOne: 'foo',
            attrTwo: 'bar'
          })
        ).toBe(instance);

        expect(instance.getNativeElement().getAttribute('attrOne')).toEqual(
          'foo'
        );
        expect(instance.getNativeElement().getAttribute('attrTwo')).toEqual(
          'bar'
        );
      });
    });

    describe('getAttribute', () => {
      it('should get the specified attribute', () => {
        const instance = new EZElement('div');
        instance.getNativeElement().setAttribute('foo', 'bar');
        expect(instance.getNativeElement().getAttribute('foo')).toEqual('bar');

        expect(instance.getAttribute('foo')).toEqual('bar');
      });
    });

    describe('removeAttribute', () => {
      it('should remove the specified attribute', () => {
        const instance = new EZElement('div');
        instance.getNativeElement().setAttribute('foo', 'bar');
        expect(instance.getNativeElement().getAttribute('foo')).toEqual('bar');

        expect(instance.removeAttribute('foo')).toBe(instance);

        expect(instance.getNativeElement().getAttribute('foo')).toEqual(null);
      });
    });
  });

  describe('setTextContent/getTextContent', () => {
    it('should set the text content of the element and return this', () => {
      const instance = new EZElement('div');

      expect(instance.setTextContent('Lorem ipsum')).toBe(instance);
      expect(instance.getTextContent()).toEqual('Lorem ipsum');
      expect(instance.getNativeElement().textContent).toEqual('Lorem ipsum');
    });

    describe('getTextContent', () => {
      it('should get text content set through the native element', () => {
        const instance = new EZElement('div');

        instance.getNativeElement().textContent = 'Lorem ipsum';

        expect(instance.getTextContent()).toEqual('Lorem ipsum');
      });
    });
  });

  describe('onClick', () => {
    it('should add a click event handler', () => {
      const instance = new EZElement('div');
      const clickHandler = jest.fn();
      expect(instance.onClick(clickHandler)).toBe(instance);

      instance.getNativeElement().dispatchEvent(new MouseEvent('click'));

      expect(clickHandler).toBeCalled();
    });
  });

  describe('isEventTarget', () => {
    it('should return whether the element was the target of the event', done => {
      const instanceOne = new EZElement('div');
      const instanceTwo = new EZElement('div');

      instanceOne.onClick((event: MouseEvent) => {
        expect(event.target).toBe(instanceOne.getNativeElement());
        expect(instanceOne.isEventTarget(event)).toBeTruthy();
        expect(instanceTwo.isEventTarget(event)).toBeFalsy();

        done();
      });

      instanceOne.getNativeElement().dispatchEvent(new MouseEvent('click'));
    });
  });

  describe('containsEventTarget', () => {
    it('should return whether the element contains the target node of the event', done => {
      const parent = new EZElement('div');
      const child = new EZElement('div');
      parent.append(child);

      child.onClick((event: MouseEvent) => {
        expect(event.target).toBe(child.getNativeElement());
        expect(parent.isEventTarget(event)).toBeFalsy();
        expect(parent.containsEventTarget(event)).toBeTruthy();
        expect(child.isEventTarget(event)).toBeTruthy();
        expect(child.containsEventTarget(event)).toBeTruthy();

        done();
      });

      child.getNativeElement().dispatchEvent(new MouseEvent('click'));
    });
  });

  describe('contains', () => {
    it('should return whether the element contains the specified child', () => {
      const parent = new EZElement('div');
      const child = new EZElement('div');
      const nativeDiv = document.createElement('div');

      expect(parent.contains(child)).toBeFalsy();
      expect(parent.contains(nativeDiv)).toBeFalsy();

      parent.append(child, nativeDiv);
      expect(parent.contains(child)).toBeTruthy();
      expect(parent.contains(nativeDiv)).toBeTruthy();
    });
  });

  describe('replaceWith', () => {
    it('should replace the element with the specified EZElement', () => {
      const parent = new EZElement('div');
      const childOne = new EZElement('div');
      const childTwo = new EZElement('div');
      parent.append(childOne);

      expect(parent.getChild(0)).toBe(childOne.getNativeElement());
      expect(childOne.getParent()).toBe(parent.getNativeElement());

      expect(childOne.replaceWith(childTwo)).toBe(childOne);

      expect(parent.getChild(0)).toBe(childTwo.getNativeElement());
      expect(childTwo.getParent()).toBe(parent.getNativeElement());
      expect(childOne.getParent()).toBe(null);
    });

    it('should replace the element with the specified HTMLElement', () => {
      const parent = new EZElement('div');
      const childOne = new EZElement('div');
      const childTwo = document.createElement('div');
      parent.append(childOne);

      expect(parent.getChild(0)).toBe(childOne.getNativeElement());
      expect(childOne.getParent()).toBe(parent.getNativeElement());

      expect(childOne.replaceWith(childTwo)).toBe(childOne);

      expect(parent.getChild(0)).toBe(childTwo);
      expect(childTwo.parentNode).toBe(parent.getNativeElement());
      expect(childOne.getParent()).toBe(null);
    });
  });

  describe('removeFromParent', () => {
    it('should remove the element from its parent', () => {
      const parent = new EZElement('div');
      const child = new EZElement('div');
      parent.append(child);
      expect(parent.getChild(0)).toBe(child.getNativeElement());
      expect(child.getParent()).toBe(parent.getNativeElement());

      expect(child.removeFromParent()).toBe(child);

      expect(child.getParent()).toBe(null);
    });

    it('do nothing if the element does not have a parent', () => {
      const child = new EZElement('div');
      expect(child.getParent()).toBe(null);

      expect(child.removeFromParent()).toBe(child);

      expect(child.getParent()).toBe(null);
    });
  });

  describe('addEventListener', () => {
    it('should add the handler', () => {
      const instance = new EZElement('div');
      const clickHandler = jest.fn();
      expect(instance.addEventListener('click', clickHandler)).toBe(instance);

      instance.getNativeElement().dispatchEvent(new MouseEvent('click'));

      expect(clickHandler).toBeCalled();
    });
  });

  describe('removeEventListener', () => {
    it('should remove the handler', () => {
      const instance = new EZElement('div');
      const clickHandler = jest.fn();
      expect(instance.addEventListener('click', clickHandler)).toBe(instance);

      instance.getNativeElement().dispatchEvent(new MouseEvent('click'));

      expect(clickHandler).toBeCalledTimes(1);

      clickHandler.mockClear();

      expect(instance.removeEventListener('click', clickHandler)).toBe(
        instance
      );

      instance.getNativeElement().dispatchEvent(new MouseEvent('click'));

      expect(clickHandler).toBeCalledTimes(0);
    });
  });

  describe('applyChildren', () => {
    it('should add children that are not present', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.applyChildren([childOne, childTwo, childThree, childFour])
      ).toBe(instance);

      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);
    });

    it('should replace children', () => {
      const instance = new EZElement('div');

      const existingChildOne = document.createElement('div');
      const existingChildTwo = document.createElement('div');
      instance.append(existingChildOne, existingChildTwo);
      expect(instance.getChild(0)).toBe(existingChildOne);
      expect(instance.getChild(1)).toBe(existingChildTwo);
      expect(existingChildOne.parentNode).toBe(instance.getNativeElement());
      expect(existingChildTwo.parentNode).toBe(instance.getNativeElement());

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.applyChildren([childOne, childTwo, childThree, childFour])
      ).toBe(instance);

      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);

      expect(existingChildOne.parentNode).toBe(null);
      expect(existingChildTwo.parentNode).toBe(null);
    });

    it('should reorder existing children', () => {
      const instance = new EZElement('div');

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.applyChildren([childOne, childTwo, childThree, childFour])
      ).toBe(instance);

      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);

      expect(
        instance.applyChildren([childFour, childTwo, childThree, childOne])
      ).toBe(instance);

      expect(instance.getChild(0)).toBe(childFour.element);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childOne);
    });
  });

  describe('setChildContainer', () => {
    it('should cause appends to be applied to the specified element', () => {
      const instance = new EZElement('div');

      // Before setChildContainer the child container should be the element
      expect(instance.getChildContainer()).toBe(instance.getNativeElement());

      const newContainer = document.createElement('div');
      instance.setChildContainer(newContainer);

      expect(instance.getChildContainer()).toBe(newContainer);

      const childOne = document.createElement('div');
      expect(instance.append(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(childOne.parentNode).toBe(newContainer);
      expect(newContainer.childNodes[0]).toEqual(childOne);

      const childTwo = document.createElement('div');
      expect(instance.append(childTwo)).toBe(instance);
      expect(instance.getChild(1)).toBe(childTwo);
      expect(childTwo.parentNode).toBe(newContainer);
      expect(newContainer.childNodes[1]).toEqual(childTwo);
    });

    it('should cause prepends to be applied to the specified element', () => {
      const instance = new EZElement('div');
      const newContainer = document.createElement('div');
      instance.setChildContainer(newContainer);

      const childOne = document.createElement('div');
      expect(instance.prepend(childOne)).toBe(instance);
      expect(instance.getChild(0)).toBe(childOne);
      expect(childOne.parentNode).toBe(newContainer);
      expect(newContainer.childNodes[0]).toEqual(childOne);

      const childTwo = document.createElement('div');
      expect(instance.prepend(childTwo)).toBe(instance);
      expect(instance.getChild(0)).toBe(childTwo);
      expect(childTwo.parentNode).toBe(newContainer);
      expect(newContainer.childNodes[0]).toEqual(childTwo);

      expect(instance.getChild(1)).toBe(childOne);
      expect(newContainer.childNodes[1]).toEqual(childOne);
    });

    it('should cause applyChildren to be applied to the specified element', () => {
      const instance = new EZElement('div');
      const newContainer = document.createElement('div');
      instance.setChildContainer(newContainer);

      const existingChildOne = document.createElement('div');
      const existingChildTwo = document.createElement('div');
      instance.append(existingChildOne, existingChildTwo);
      expect(instance.getChild(0)).toBe(existingChildOne);
      expect(instance.getChild(1)).toBe(existingChildTwo);
      expect(existingChildOne.parentNode).toBe(newContainer);
      expect(existingChildTwo.parentNode).toBe(newContainer);

      const childOne = document.createElement('div');
      const childTwo = new EZElement('div');
      const childThree = 'Foo';
      const childFour = { element: document.createElement('span') };

      expect(
        instance.applyChildren([childOne, childTwo, childThree, childFour])
      ).toBe(instance);

      expect(instance.getChild(0)).toBe(childOne);
      expect(instance.getChild(1)).toBe(childTwo.getNativeElement());
      expect(instance.getChild(2)).toBeInstanceOf(Text);
      expect(instance.getChild(2)!.textContent).toEqual('Foo');
      expect(instance.getChild(3)).toBe(childFour.element);
      expect(childOne.parentNode).toBe(newContainer);
      expect(childTwo.getNativeElement().parentNode).toBe(newContainer);
      expect(childFour.element.parentNode).toBe(newContainer);

      expect(existingChildOne.parentNode).toBe(null);
      expect(existingChildTwo.parentNode).toBe(null);
    });

    it('should throw an error if container is something other than a DocumentFragment or HTMLElement', () => {
      const instance = new EZElement('div');

      const expectedError =
        'child container must be a DocumentFragment or a HTMLElement';

      expect(() => instance.setChildContainer(null as any)).toThrowError(
        expectedError
      );
      expect(() => instance.setChildContainer(new EZDiv() as any)).toThrowError(
        expectedError
      );
      expect(() => instance.setChildContainer(document)).toThrowError(
        expectedError
      );
    });
  });
});

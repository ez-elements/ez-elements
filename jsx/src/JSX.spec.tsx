import * as EZJSX from './JSX';
import { EZElement } from "@ez-elements/core";

const React = EZJSX.JSX;

describe('JSX', () => {
  it('should create EZElements for a given native tag', () => {
    const created = <div/>;
    expect(created).toBeInstanceOf(EZElement);
    expect(created.getNativeElement()).toBeInstanceOf(HTMLDivElement);
  });

  it('should create EZElements for a given native tag with attributes', () => {
    const created = <div align="center" data-test={"foo"}/>;
    expect(created).toBeInstanceOf(EZElement);
    expect(created.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(created.getNativeElement().getAttribute('align')).toEqual('center');
    expect(created.getNativeElement().getAttribute('data-test')).toEqual('foo');
  });

  it('should accept an EZElement as a child', () => {
    const someElement = new EZElement('div').setTextContent('foo');
    const created = <div>{someElement}</div>;
    expect(created.getChild(0)).toBe(someElement.getNativeElement());
  });

  it('should accept an HTMLElement as a child', () => {
    const someElement = document.createElement('span');
    const created = <div>{someElement}</div>;
    expect(created.getChild(0)).toBe(someElement);
  });

  it('should accept a function reference that returns an EZElement as a child', () => {
    function SomeFunc(props: { text: string }) {
      return new EZElement('span').setTextContent(props.text);
    }

    const created = <div><SomeFunc text={'foo'}/></div>;
    expect(created.getChild(0)).toBeInstanceOf(HTMLSpanElement);
    expect(created.getChild(0)!.textContent).toEqual('foo');
  });

  it('should call a function reference that returns an EZElement', () => {
    function SomeFunc(props: { text: string }) {
      return new EZElement('span').setTextContent(props.text);
    }

    const created = <SomeFunc text={'foo'}/>;
    expect(created).toBeInstanceOf(EZElement);
    expect(created.getTextContent()).toEqual('foo');
  });

  it('should accept a function reference that returns an HTMLElement as a child', () => {
    function SomeFunc(props: { text: string }) {
      const element = document.createElement('span');
      element.textContent = props.text;
      return element;
    }

    // TODO - enable passing a function that doesn't return an EZElement
    // @ts-ignore
    const created = <div><SomeFunc text={'foo'}/></div>;
    expect(created.getChild(0)).toBeInstanceOf(HTMLSpanElement);
    expect(created.getChild(0)!.textContent).toEqual('foo');
  });

  it('should call a function reference that returns an HTMLElement', () => {
    function SomeFunc(props: { text: string }) {
      const element = document.createElement('span');
      element.textContent = props.text;
      return element;
    }

    // TODO - enable passing a function that doesn't return an EZElement
    // @ts-ignore
    const created = <SomeFunc text={'foo'}/>;
    expect(created).toBeInstanceOf(EZElement);
    expect(created.getNativeElement()).toBeInstanceOf(HTMLSpanElement);
    expect(created.getNativeElement().textContent).toEqual('foo');
  });

  describe('onClick', () => {
    it('should add a click listener', () => {
      const fn = jest.fn();
      const created = <div onClick={fn}/>;
      created.getNativeElement().dispatchEvent(new MouseEvent('click'));
      expect(fn).toBeCalledTimes(1);
    });
  })

  describe('style', () => {
    it('should apply style if it is a string', () => {
      const created = <div style="color: red;"/>;
      expect(window.getComputedStyle(created.getNativeElement()).color).toEqual('red');
    });

    it('should apply style if it is an object', () => {
      const created = <div style={{color: 'red'}}/>;
      expect(window.getComputedStyle(created.getNativeElement()).color).toEqual('red');
    });
  });
});
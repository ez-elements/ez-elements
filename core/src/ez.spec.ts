import { ez } from './ez';
import { EZElement } from './EZElement';

describe('ez', () => {
  it('should construct an EZElement with the given tag', () => {
    const instance = ez('div');
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
  });

  it('should construct an EZElement with an existing element', () => {
    const existingDiv = document.createElement('div');
    const instance = ez(existingDiv);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement()).toBe(existingDiv);
  });

  it('should pass through an existing EZElement', () => {
    const existingEZElement = new EZElement('div');
    const existingDiv = existingEZElement.getNativeElement();
    const instance = ez(existingEZElement);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement()).toBe(existingDiv);
  });

  it('should construct an EZElement with a given tag and the specified class', () => {
    const instance = ez('div', 'foo');
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement().classList.contains('foo')).toBeTruthy();
  });

  it('should construct an EZElement with a given tag and multiple classes', () => {
    const instance = ez('div', ['foo', 'bar']);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement().classList.contains('foo')).toBeTruthy();
    expect(instance.getNativeElement().classList.contains('bar')).toBeTruthy();
  });

  it('should construct an EZElement with a given tag and a map of active classes', () => {
    const instance = ez('div', { foo: true, bar: true, baz: false });
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
    expect(instance.getNativeElement().classList.contains('foo')).toBeTruthy();
    expect(instance.getNativeElement().classList.contains('bar')).toBeTruthy();
    expect(instance.getNativeElement().classList.contains('baz')).toBeFalsy();
  });
});

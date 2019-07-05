import { EZElement, NativeElement } from './EZElement';

/** @internal */

type ClassArg = string | Array<string> | { [key: string]: boolean };

export function ez<T extends NativeElement>(
  arg: T | HTMLElementTagNameMap[T] | EZElement<T>,
  classes?: ClassArg
): EZElement<T> {
  let instance: EZElement<T>;
  if (EZElement.isEZElement(arg)) {
    instance = arg;
  } else {
    instance = new EZElement(arg);
  }
  if (classes !== undefined) {
    if (Array.isArray(classes)) {
      instance.addClass(...classes);
    } else if (typeof classes === 'string') {
      instance.addClass(classes);
    } else {
      instance.setClasses(classes);
    }
  }
  return instance;
}

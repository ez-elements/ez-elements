import { EZSpan } from "./EZSpan";
import { EZElement } from "./EZElement";

describe('EZSpan', () => {
  it('should construct', () => {
    const instance = new EZSpan();
    expect(instance).toBeInstanceOf(EZElement);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLSpanElement);
  });
});
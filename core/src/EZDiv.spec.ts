import { EZDiv } from './EZDiv';
import { EZElement } from './EZElement';

describe('EZDiv', () => {
  it('should construct', () => {
    const instance = new EZDiv();
    expect(instance).toBeInstanceOf(EZElement);
    expect(instance.getNativeElement()).toBeInstanceOf(HTMLDivElement);
  });
});

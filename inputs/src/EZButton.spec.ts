import { EZButton } from './EZButton';

describe('EZButton', () => {
  it('should fire the provided callback on click', () => {
    const cb: () => void = jest.fn();
    const instance = new EZButton(cb);

    instance.getNativeElement().dispatchEvent(new MouseEvent('click'));

    expect(cb).toBeCalledTimes(1);
  });

  describe('disable', () => {
    it('should disable the button', () => {
      const cb = jest.fn();
      const instance = new EZButton(cb);

      instance.disable();
      expect(instance.getNativeElement().getAttribute('disabled')).toEqual(
        'disabled'
      );
    });
  });

  describe('enable', () => {
    it('should enable the button', () => {
      const cb = jest.fn();
      const instance = new EZButton(cb);

      instance.disable();
      expect(instance.getNativeElement().getAttribute('disabled')).toEqual(
        'disabled'
      );

      instance.enable();
      expect(instance.getNativeElement().getAttribute('disabled')).toEqual(
        null
      );
    });
  });
});

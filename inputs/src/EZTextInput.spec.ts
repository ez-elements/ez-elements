import { EZTextInput } from './EZTextInput';

describe('EZTextInput', () => {
  it('should fire the provided callback on change', () => {
    const cb: (val: string) => void = jest.fn();
    const instance = new EZTextInput(cb);

    instance.getNativeElement().value = 'f';
    instance.getNativeElement().dispatchEvent(new Event('input'));

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith('f');
  });

  describe('setValue', () => {
    it('should set the input value and fire the callback by default', () => {
      const cb: (val: string) => void = jest.fn();
      const instance = new EZTextInput(cb);

      instance.setValue('foobar');

      expect(cb).toBeCalledTimes(1);
      expect(cb).toBeCalledWith('foobar');
      expect(instance.getNativeElement().value).toEqual('foobar');
    });

    it('should set the input value and not fire the callback if specified', () => {
      const cb: (val: string) => void = jest.fn();
      const instance = new EZTextInput(cb);

      instance.setValue('foobar', false);

      expect(cb).toBeCalledTimes(0);
      expect(instance.getNativeElement().value).toEqual('foobar');
    });
  });
});

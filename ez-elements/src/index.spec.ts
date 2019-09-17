import * as whole from './index';

describe('ez-elements', () => {
  it('should directly export all of the exports of the sub-packages', () => {
    // core
    expect(whole.ez).toBeInstanceOf(Function);
    expect(whole.EZElement).toBeInstanceOf(Function);
    expect(whole.EZDiv).toBeInstanceOf(Function);
    expect(whole.EZSpan).toBeInstanceOf(Function);

    // inputs
    expect(whole.EZButton).toBeInstanceOf(Function);
    expect(whole.EZTextInput).toBeInstanceOf(Function);

    // jsx
    expect(whole.JSX).toBeInstanceOf(Function);

    // shadow
    expect(whole.extractStyleContents).toBeInstanceOf(Function);
    expect(whole.EZShadowElement).toBeInstanceOf(Function);
  });
});
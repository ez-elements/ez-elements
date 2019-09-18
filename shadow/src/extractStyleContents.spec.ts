import { extractStyleContents } from './extractStyleContents';

describe('extractStyleContents', () => {
  it('should extract the contents of a style tag from a html string', () => {
    expect(extractStyleContents('<style>div {color: red;}</style>')).toEqual(
      'div {color: red;}'
    );
  });

  it('should throw an error if the provided string is not valid html', () => {
    expect(() => extractStyleContents('foo')).toThrowError(
      'extractStyleContents was not called with a single <style></style> html string'
    );
  });

  it('should throw an error if the string contains one element that is not a style tag', () => {
    expect(() =>
      extractStyleContents('<div>div {color: red;}</div>')
    ).toThrowError(
      'extractStyleContents was not called with a single <style></style> html string'
    );
  });

  it('should throw an error if the string contains multiple html elements', () => {
    expect(() =>
      extractStyleContents('<style>div {color: red;}</style><div>foo</div>')
    ).toThrowError(
      'extractStyleContents was not called with a single <style></style> html string'
    );
  });
});

/** @internal */
export function extractStyleContents(html: string): string {
  const sheet = document.createElement('div');
  sheet.innerHTML = html;
  const firstChild = sheet.childNodes[0];
  if (
    sheet.childNodes.length !== 1 ||
    !(firstChild instanceof HTMLStyleElement)
  ) {
    throw new Error(
      'extractStyleContents was not called with a single <style></style> html string'
    );
  }
  return sheet.childNodes[0].textContent!;
}

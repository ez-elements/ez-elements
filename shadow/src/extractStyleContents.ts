/** @internal */
export function extractStyleContents(html: string): string {
  const sheet = document.createElement('div');
  sheet.innerHTML = html;
  return sheet.childNodes[0].textContent!;
}

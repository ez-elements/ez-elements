import { ez, EZDiv } from "ez-elements";

// include the file in the code-prettyify package that adds the functions
// to the window so that they can be invoked after pre tags are added
// after page load.
require('../../node_modules/code-prettify/src/run_prettify');

const inactiveTabBackgroundColor = '#BBB';
const inactiveTabColor = 'black';
const activeTabBackgroundColor = '#DDD';
const activeTabColor = 'blue';

export function SourceCode(files: { [key: string]: string }) {
  const contentHolder = ez('div');

  let currentTab: EZDiv | null = null;
  const tabs: Array<EZDiv> = [];
  Object.entries(files).forEach(([fileName, contents]) => {
    const tab = ez('div')
      .addStyles({
        border: '1px solid black',
        borderBottom: 'none',
        cursor: 'pointer',
        padding: '5px',
        color: inactiveTabColor,
        backgroundColor: inactiveTabBackgroundColor,
      })
      .setTextContent(fileName)
      .onClick(() => {
        if (currentTab) {
          currentTab.addStyles({
            color: inactiveTabColor,
            backgroundColor: inactiveTabBackgroundColor,
          });
        }
        currentTab = tab;
        tab.addStyles({
          color: activeTabColor,
          backgroundColor: activeTabBackgroundColor,
        });
        contentHolder.applyChildren([
          ez('pre', 'prettyprint')
            .setTextContent(contents)
            .addStyles({
              margin: '0',
              border: '1px solid black',
            }),
        ]);
        prettyPrintCode();
      });
    tabs.push(tab);
  });

  if (tabs.length > 0) {
    tabs[0].getNativeElement().dispatchEvent(new MouseEvent('click'));
  }

  return ez('div').append(
    ez('div').addStyles({
      display: 'flex',
    }).append(tabs),
    contentHolder,
  );
}

function prettyPrintCode() {
  setTimeout(() => {
    // Trigger the prettyprinting of pre tags using code-prettify
    (window as any).PR.prettyPrint()
  }, 0);
}
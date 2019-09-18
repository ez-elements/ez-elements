import { ez, EZDiv } from "ez-elements";
import { ShadowExample } from "./shadow-example/ShadowExample";
import { ButtonExample } from "./button-example/ButtonExample";
import { JSXExample } from "./jsx-example/JSXExample";
import { EZButtonExample } from "./ez-button-example/EZButtonExample";
import { EZButtonSubclassExample } from "./ez-button-subclass-example/EZButtonSubclassExample";
import { EZTextInputExample } from "./ez-textinput-example/EZTextInputExample";
import { BasicEZElementsExample } from "./basic-ezelements/BasicEZElementsExample";

const examples: { [key: string]: (holder: EZDiv) => void } = {
  'Basic EZElements': BasicEZElementsExample,
  'Button': ButtonExample,
  'EZButton': EZButtonExample,
  'EZButton Subclass': EZButtonSubclassExample,
  'EZTextInput': EZTextInputExample,
  'Shadow': ShadowExample,
  'JSX': JSXExample,
};

let buttonsHolder = ez('div').addStyles({
  marginBottom: '10px',
});
let exampleHolder = ez('div');

function loadExample(exampleName: string) {
  if (exampleName === '') {
    exampleHolder.setTextContent('Pick an example');
    return;
  }

  // Clear the example holder
  exampleHolder.setTextContent('');
  const example = examples[exampleName];
  if (example) {
    example(exampleHolder);
  } else {
    exampleHolder.setTextContent(`Example not found for "${exampleName}"`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buttonsHolder.appendTo(document.body);
  exampleHolder.appendTo(document.body);

  for (let i in examples) {
    ez('a')
      .addStyles({
        padding: '10px',
        margin: '5px',
      })
      .setTextContent(i)
      .setAttribute('href', `#${i}`)
      .appendTo(buttonsHolder);
  }

  loadExample(decodeURIComponent(window.location.hash.substring(1)));
});

window.addEventListener('hashchange', () => {
  loadExample(decodeURIComponent(window.location.hash.substring(1)));
});

import { ez, EZDiv } from "ez-elements";
import { ShadowExampleWrapper } from "./shadow-example/ShadowExampleWrapper";
import { ButtonExampleWrapper } from "./button-example/ButtonExampleWrapper";
import { JSXExampleWrapper } from "./jsx-example/JSXExampleWrapper";
import { EZButtonExampleWrapper } from "./ez-button-example/EZButtonExampleWrapper";
import { EZButtonSubclassExampleWrapper } from "./ez-button-subclass-example/EZButtonSubclassExampleWrapper";
import { EZTextInputExampleWrapper } from "./ez-textinput-example/EZTextInputExampleWrapper";
import { BasicEZElementsExampleWrapper } from "./basic-ezelements/BasicEZElementsExampleWrapper";

const examples: { [key: string]: (holder: EZDiv) => void } = {
  'Basic EZElements': BasicEZElementsExampleWrapper,
  'Button': ButtonExampleWrapper,
  'EZButton': EZButtonExampleWrapper,
  'EZButton Subclass': EZButtonSubclassExampleWrapper,
  'EZTextInput': EZTextInputExampleWrapper,
  'Shadow': ShadowExampleWrapper,
  'JSX': JSXExampleWrapper,
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

import { ez, EZDiv, EZElement, EZTextInput } from 'ez-elements';
import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from "fs";

export function EZTextInputExample(holder: EZDiv) {
  let textInput: EZTextInput;
  let statusElement: EZElement<'div'>;
  holder.append(
    ez('h3').setTextContent('EZTextInput'),
    ez('p').append(
      'Source shows how to use ',
      ez('code').append('EZTextInput'),
      ' instances to create text inputs with callbacks.'
    ),

    (textInput = new EZTextInput((newValue: string) => {
      statusElement.setTextContent(`Input value: ${newValue}`);
    })),
    (statusElement = ez('div')),
    ez('button')
      .setTextContent('Set to "Foo"')
      .onClick(() => {
        textInput.setValue('Foo');
      }),
    ez('button')
      .setTextContent('Set to "Bar" without change callback')
      .onClick(() => {
        textInput.setValue('Bar', false);
      }),

    SourceCode({
      'EZTextInputExample.ts': readFileSync(__dirname + '/' + 'EZTextInputExample.ts', 'utf-8'),
    }),
  );
}

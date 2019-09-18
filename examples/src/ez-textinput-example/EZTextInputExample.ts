import { ez, EZElement, EZTextInput } from 'ez-elements';

export function EZTextInputExample() {
  let textInput: EZTextInput;
  let statusElement: EZElement<'div'>;

  return ez('div').append(
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
      })
  );
}

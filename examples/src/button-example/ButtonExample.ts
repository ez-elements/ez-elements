import { ez } from 'ez-elements';
import { StatusElement } from '../shared/StatusElement';

export function ButtonExample() {
  let statusElement: StatusElement;

  return ez('div').append(
    (statusElement = new StatusElement(false)),
    ez('button')
      .setTextContent('Enable')
      .onClick(() => {
        statusElement.enable();
      }),

    ez('button')
      .setTextContent('Disable')
      .onClick(() => {
        statusElement.disable();
      })
  );
}

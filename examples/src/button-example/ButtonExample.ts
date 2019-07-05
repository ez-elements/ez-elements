import { ez, EZDiv } from '@ez-elements/core';
import { StatusElement } from '../shared/StatusElement';

export function ButtonExample(holder: EZDiv) {
  let statusElement: StatusElement;
  holder.append(
    ez('h3').setTextContent('Simple <button/> elements'),
    ez('p').append(
      'Source shows how to create ',
      ez('code').append('<button/>'),
      ' elements using the ',
      ez('code').append('ez("button")'),
      ' function.'
    ),

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

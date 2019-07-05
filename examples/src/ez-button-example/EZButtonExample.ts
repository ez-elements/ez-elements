import { ez, EZDiv } from '@ez-elements/core';
import { EZButton } from '@ez-elements/inputs';
import { StatusElement } from '../shared/StatusElement';

export function EZButtonExample(holder: EZDiv) {
  let statusElement: StatusElement;
  holder.append(
    ez('h3').setTextContent('EZButton instances'),
    ez('p').append(
      'Source shows how to use ',
      ez('code').append('EZButton'),
      ' instances to create buttons.'
    ),

    (statusElement = new StatusElement(false)),
    new EZButton(() => {
      statusElement.enable();
    }).append(
      ez('div').setTextContent('✅'),
      ez('div').setTextContent('Enable')
    ),

    new EZButton(() => {
      statusElement.disable();
    }).append(
      ez('div').setTextContent('🔴'),
      ez('div').setTextContent('Disable')
    )
  );
}

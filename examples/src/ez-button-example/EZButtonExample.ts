import { ez, EZButton } from 'ez-elements';
import { StatusElement } from '../shared/StatusElement';

export function EZButtonExample() {
  let statusElement: StatusElement;

  return ez('div').append(
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

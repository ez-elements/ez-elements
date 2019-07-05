import { EZDiv } from '@ez-elements/core';
import { ToggleIconTextButton } from './ToggleIconTextButton';
import { StatusElement } from '../shared/StatusElement';
import { ez } from '@ez-elements/core';

export function EZButtonSubclassExample(holder: EZDiv) {
  const statusElement = new StatusElement(false);

  holder.append(
    ez('h3').setTextContent('EZButton Subclass'),
    ez('p').append(
      'Source shows how to extend ',
      ez('code').append('EZButton'),
      ' to create more complex buttons.'
    ),

    statusElement,
    new ToggleIconTextButton(
      {
        activeIcon: '👍',
        activeText: 'Enabled',
        inactiveIcon: '👎',
        inactiveText: 'Disabled'
      },
      (active: boolean) => {
        if (active) {
          statusElement.enable();
        } else {
          statusElement.disable();
        }
      },
      false
    )
  );
}

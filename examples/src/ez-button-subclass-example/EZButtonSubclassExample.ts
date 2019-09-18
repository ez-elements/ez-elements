import { ez } from 'ez-elements';
import { ToggleIconTextButton } from './ToggleIconTextButton';
import { StatusElement } from '../shared/StatusElement';

export function EZButtonSubclassExample() {
  const statusElement = new StatusElement(false);

  return ez('div').append(
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

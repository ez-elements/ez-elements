import { ez, EZDiv } from 'ez-elements';
import { ToggleIconTextButton } from './ToggleIconTextButton';
import { StatusElement } from '../shared/StatusElement';
import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from "fs";

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
    ),

    SourceCode({
      'EZButtonSubclassExample.ts': readFileSync(__dirname + '/' + 'EZButtonSubclassExample.ts', 'utf-8'),
      'ToggleIconTextButton.ts': readFileSync(__dirname + '/' + 'ToggleIconTextButton.ts', 'utf-8'),
    }),
  );
}

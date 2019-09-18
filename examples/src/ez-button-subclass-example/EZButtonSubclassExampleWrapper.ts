import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';
import { ExampleHolder } from '../shared/ExampleHolder';
import { EZButtonSubclassExample } from './EZButtonSubclassExample';

export function EZButtonSubclassExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('EZButton Subclass'),
    ez('p').append(
      'Source shows how to extend ',
      ez('code').append('EZButton'),
      ' to create more complex buttons.'
    ),

    ExampleHolder(EZButtonSubclassExample()),

    SourceCode({
      'EZButtonSubclassExample.ts': readFileSync(
        __dirname + '/EZButtonSubclassExample.ts',
        'utf-8'
      ),
      'ToggleIconTextButton.ts': readFileSync(
        __dirname + '/ToggleIconTextButton.ts',
        'utf-8'
      )
    })
  );
}

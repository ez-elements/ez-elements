import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';
import { ExampleHolder } from '../shared/ExampleHolder';
import { EZTextInputExample } from './EZTextInputExample';

export function EZTextInputExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('EZTextInput'),
    ez('p').append(
      ez('code').append('EZTextInput'),
      ' is a thin wrapper around an ',
      ez('code').append('<input type="text"/>'),
      'that simplifies getting and setting values'
    ),

    ExampleHolder(EZTextInputExample()),

    SourceCode({
      'EZTextInputExample.ts': readFileSync(
        __dirname + '/EZTextInputExample.ts',
        'utf-8'
      )
    })
  );
}

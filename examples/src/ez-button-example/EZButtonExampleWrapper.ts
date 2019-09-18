import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';
import { ExampleHolder } from '../shared/ExampleHolder';
import { EZButtonExample } from './EZButtonExample';

export function EZButtonExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('EZButton instances'),
    ez('p').append(
      'Source shows how to use ',
      ez('code').append('EZButton'),
      ' instances to create buttons.'
    ),

    ExampleHolder(EZButtonExample()),

    SourceCode({
      'EZButtonExample.ts': readFileSync(
        __dirname + '/EZButtonExample.ts',
        'utf-8'
      )
    })
  );
}

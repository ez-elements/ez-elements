import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';

import { ez, EZDiv } from 'ez-elements';
import { ExampleHolder } from '../shared/ExampleHolder';
import { BasicEZElementsExample } from './BasicEZElementsExample';

export function BasicEZElementsExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Basic EZElements'),
    ez('p').append(
      'How to create elements using ',
      ez('code').append('new EZElement(tag)'),
      ', ',
      ez('code').append('ez(tag)'),
      ', ',
      ez('code').append('new EZDiv()'),
      ', and ',
      ez('code').append('new EZSpan()')
    ),

    ExampleHolder(BasicEZElementsExample()),

    SourceCode({
      'BasicEZElementsExample.ts': readFileSync(
        __dirname + '/BasicEZElementsExample.ts',
        'utf-8'
      )
    })
  );
}

import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';
import { ExampleHolder } from '../shared/ExampleHolder';
import { ButtonExample } from './ButtonExample';

export function ButtonExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Simple <button/> elements'),
    ez('p').append(
      'Source shows how to create ',
      ez('code').append('<button/>'),
      ' elements using the ',
      ez('code').append('ez("button")'),
      ' function.'
    ),

    ExampleHolder(ButtonExample()),

    SourceCode({
      'ButtonExample.ts': readFileSync(__dirname + '/ButtonExample.ts', 'utf-8')
    })
  );
}

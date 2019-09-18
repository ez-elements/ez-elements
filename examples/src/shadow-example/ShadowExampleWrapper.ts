import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from '../shared/SourceCode';
import { readFileSync } from 'fs';
import { ShadowExample } from './ShadowExample';
import { ExampleHolder } from '../shared/ExampleHolder';

export function ShadowExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Shadow (WebComponents)'),
    ez('p').append(
      'Source shows how to subclass ',
      ez('code').append('EZShadowElement'),
      ' to create components that have separate CSS rules and lifecycle callbacks.'
    ),

    ExampleHolder(ShadowExample()),

    SourceCode({
      'ShadowExample.ts': readFileSync(
        __dirname + '/ShadowExample.ts',
        'utf-8'
      ),
      'FilterableStaticList.ts': readFileSync(
        __dirname + '/list/FilterableStaticList.ts',
        'utf-8'
      ),
      'ShadowListChild.ts': readFileSync(
        __dirname + '/list/ShadowListChild.ts',
        'utf-8'
      )
    })
  );
}

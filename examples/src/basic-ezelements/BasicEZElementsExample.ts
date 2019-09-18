import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from 'fs';

import { ez, EZDiv, EZElement, EZSpan } from 'ez-elements';

export function BasicEZElementsExample(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Basic EZElements'),
    ez('p').append(
      'Source shows how to create elements using ',
      ez('code').append('new EZElement(tag)'), ', ',
      ez('code').append('ez(tag)'), ', ',
      ez('code').append('new EZDiv()'), ', and ',
      ez('code').append('new EZSpan()')
    ),

    new EZElement('div').setTextContent(
      'Constructed using new EZElement("div")'
    ),
    ez('div').setTextContent('Constructed using ez("div")'),
    new EZDiv().setTextContent('Constructed using new EZDiv()'),
    new EZSpan().setTextContent('Constructed using new EZSpan()'),

    ez('p').setTextContent(
      'All instances are EZElements so they have convenience functions available for appending/prepending etc.'
    ),

    new EZElement('div').append(
      ez('div').append(
        new EZDiv().append(
          new EZSpan().setTextContent('span within some nested divs')
        ),
        ez('span').setTextContent('You can append EZElements to EZElements'),

        (() => {
          const e = document.createElement('div');
          e.textContent = 'As well as regular HTMLElements';
          return e;
        })()
      )
    ),

    SourceCode({
      'BasicEZElementsExample.ts': readFileSync(__dirname + '/' + 'BasicEZElementsExample.ts', 'utf-8'),
    }),
  );
}

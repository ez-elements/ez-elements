import { ez, EZButton, EZDiv } from 'ez-elements';
import { StatusElement } from '../shared/StatusElement';
import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from "fs";

export function EZButtonExample(holder: EZDiv) {
  let statusElement: StatusElement;
  holder.append(
    ez('h3').setTextContent('EZButton instances'),
    ez('p').append(
      'Source shows how to use ',
      ez('code').append('EZButton'),
      ' instances to create buttons.'
    ),

    (statusElement = new StatusElement(false)),
    new EZButton(() => {
      statusElement.enable();
    }).append(
      ez('div').setTextContent('✅'),
      ez('div').setTextContent('Enable')
    ),

    new EZButton(() => {
      statusElement.disable();
    }).append(
      ez('div').setTextContent('🔴'),
      ez('div').setTextContent('Disable')
    ),

    SourceCode({
      'EZButtonExample.ts': readFileSync(__dirname + '/' + 'EZButtonExample.ts', 'utf-8'),
    }),
  );
}

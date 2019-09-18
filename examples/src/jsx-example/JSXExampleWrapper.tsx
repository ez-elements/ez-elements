import * as EZJSX from 'ez-elements';
import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from "fs";
import { JSXExample } from "./JSXExample";
import { ExampleHolder } from "../shared/ExampleHolder";

const React = EZJSX.JSX;

export function JSXExampleWrapper(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('JSX'),
    ez('p').append('JSX can be used to construct and append EZElements.'),

    ExampleHolder(JSXExample()),

    SourceCode({
      'JSXExample.tsx': readFileSync(__dirname + '/JSXExample.tsx', 'utf-8'),
    }),
  );
}

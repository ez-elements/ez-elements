import { FilterableStaticList } from './list/FilterableStaticList';
import { ShadowListChild } from './list/ShadowListChild';
import { ez, EZDiv } from 'ez-elements';
import { SourceCode } from "../shared/SourceCode";
import { readFileSync } from "fs";

export function ShadowExample(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Shadow (WebComponents)'),
    ez('p').append(
      'Source shows how to subclass ',
      ez('code').append('EZShadowElement'),
      ' to create components that have separate CSS rules and lifecycle callbacks.'
    ),

    new FilterableStaticList().setChildren(createChildren()),

    SourceCode({
      'ShadowExample.ts': readFileSync(__dirname + '/' + 'ShadowExample.ts', 'utf-8'),
      'FilterableStaticList.ts': readFileSync(__dirname + '/list/FilterableStaticList.ts', 'utf-8'),
      'ShadowListChild.ts': readFileSync(__dirname + '/list/ShadowListChild.ts', 'utf-8'),
    }),
  );
}

function createChildren() {
  const children = [];
  for (let i = 1; i <= 30; i++) {
    children.push(new ShadowListChild(i.toString(10)));
  }
  return children;
}

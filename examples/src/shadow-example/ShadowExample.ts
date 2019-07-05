import { FilterableStaticList } from './list/FilterableStaticList';
import { ShadowListChild } from './list/ShadowListChild';
import { ez, EZDiv } from '@ez-elements/core';

export function ShadowExample(holder: EZDiv) {
  holder.append(
    ez('h3').setTextContent('Shadow (WebComponents)'),
    ez('p').append(
      'Source shows how to subclass ',
      ez('code').append('EZShadowElement'),
      ' to create components that have separate CSS rules and lifecycle callbacks.'
    ),

    new FilterableStaticList().setChildren(createChildren())
  );
}

function createChildren() {
  const children = [];
  for (let i = 1; i <= 30; i++) {
    children.push(new ShadowListChild(i.toString(10)));
  }
  return children;
}

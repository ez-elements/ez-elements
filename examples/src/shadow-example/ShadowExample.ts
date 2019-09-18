import { ez } from 'ez-elements';
import { FilterableStaticList } from './list/FilterableStaticList';
import { ShadowListChild } from './list/ShadowListChild';

export function ShadowExample() {
  return ez('div').append(
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

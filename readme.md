# ez-elements

[![Build Status](https://travis-ci.org/ez-elements/ez-elements.svg?branch=master)](https://travis-ci.org/ez-elements/ez-elements) 
[![Coverage Status](https://coveralls.io/repos/github/ez-elements/ez-elements/badge.svg?branch=master)](https://coveralls.io/github/ez-elements/ez-elements?branch=master)

## Getting Started

If you find yourself writing a lot of `document.createElement` and dealing with the low-level built-in `HTMLElement` class then `ez-elements` can simplify a lot of the boilerplate code you're writing.

As an example, lets create a `div` with two `spans` inside appended to `document.body`:
```ts
const someDiv = document.createElement('div');
someDiv.classList.add('some-div');
const spanOne = document.createElement('span');
spanOne.classList.add('some-span');
spanOne.textContent = 'Hello ';
const spanTwo = document.createElement('span');
spanTwo.classList.add('some-span'); 
spanTwo.textContent = 'World';
someDiv.append(spanOne, spanTwo);
document.body.appendChild(someDiv);
```
Becomes:
```ts
let spanOne, spanTwo; // variables not required, but you can assign them inside the append
const someDiv = ez('div', 'some-div').append(
  spanOne = ez('span', 'some-span').setTextContent('Hello '),
  spanTwo = ez('span', 'some-span').setTextContent('World'),
).appendTo(document.body);
```

### How it works <sup><sub><sub><sup>(and why you should care)</sup></sub></sub></sup>

The `ez` function has the following interface:
* First argument is one of:
    * A HTML element tag name
    * A HTMLElement
    * An EZElement instance
 * Optional second argument is one of: 
    * a single class name string
    * array of class names as strings
    * an object of class name to active bool
* Returns an `EZElement` instance.

```ts
function ez<T extends keyof HTMLElementTagNameMap>(
    arg: T | HTMLElementTagNameMap[T] | EZElement<T>, 
    classes?: string | Array<string> | { [key: string]: boolean },
): EZElement<T>
```

You can also construct `EZElement` instances directly using:
```ts
const element = new EZElement('div');
```

Or extend `EZElement` to create components:
```ts
class SomeComponent extends EZElement<'div'> {
  constructor(text: string) {
    super('div');
    
    this.addClass('some-component').append(
        ez('span').setTextContent(text),
    );
  }
}

const instance = new SomeComponent('Hello World');
instance.appendTo(document.body);
```


The `EZElement` instance is a wrapper for a `HTMLElement` and provides a builder pattern interface to allow chaining, including appending/prepending children, appending to parents, adding classes, adding styles etc.

The reason you should care about what is happening under-the-hood is so that you can:
* Meaningfully debug issues relating to usage of the wrapper.
* Reason about the performance of your code without reading framework-specific guides or having a dedicated profiler/extension.
* Work around shortcomings of the wrapper where appropriate.

## Intent

The intent of the wrapper is to be thin and as close to stateless as possible whilst remaining useful.

The priorities of the package are to enable your code to be (in descending priority order):
* Debuggable
* Readable
* Performant
* Brief (as little code as possible)

## Development

This repository uses [lerna](https://github.com/lerna/lerna) to manage the multiple packages contained within it.

```bash
# Installs dependencies *and links the packages together using lerna*
npm install  

# In one terminal - watch and rebuild the packages upon changes
npm run watch

# In another terminal - start a parcel server that serves a  single page app with some examples
cd examples
npm start
```


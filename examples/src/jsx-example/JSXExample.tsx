import * as EZJSX from '@ez-elements/jsx';
import { AnyEZElement, EZDiv, EZElement } from 'ez-elements';

// "jsx": "react", in tsconfig.json means that JSX tags are transformed into
// React.createElement calls.
const React = EZJSX.JSX;

export function JSXExample() {
  const ezElementDiv = new EZElement('div').addStyles({color: 'green'}).setTextContent('ezElementDiv');
  let clickDiv: AnyEZElement;
  let reactDiv;
  let nestedDiv;
  let someComplex;
  let simpleDiv;

  const outputElement = (<div>
    <div style={'background-color: red;'}><span>style string div</span></div>
    <div style={{backgroundColor: 'green'}}>style object div</div>
    {clickDiv = <div onClick={() => {
      clickDiv.append(' - clicked')
    }}>clickDiv</div>}
    {reactDiv = React.createElement('div', {style: 'color: red;'})}
    {simpleDiv = <div className={'some-class'} style={{'color': 'orange'}}>simpleDiv</div>}
    {ezElementDiv}
    {nestedDiv = new EZElement('div').addStyles({color: 'blue'}).setTextContent('nestedDiv')}
    {someComplex = <SomeComplex text={"foo"}/>}
    {SFC({content: 'invoked explicitly'}).addStyles({color: 'violet'})}
    <SFC content={'as JSX attrs'}/>
  </div>);

  reactDiv.setTextContent("This was reactDiv");
  simpleDiv.append(" - simpleDiv.modified");
  nestedDiv.append(' - nestedDiv.modified');
  someComplex.addStyles({color: 'indigo'}).append(' - SomeComplex.modified');

  return outputElement;
}

class SomeComplex extends EZDiv {
  constructor(props: { text: string }) {
    super();
    this.setTextContent(`SomeComplex with text arg: ${props.text}`);
  }
}

function SFC(props: { content: string }) {
  return <div>I'm a SFC: {props.content}</div>;
}

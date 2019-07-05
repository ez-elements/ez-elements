import * as EZJSX from '@ez-elements/jsx';
import { AnyEZElement, EZDiv, EZElement } from "@ez-elements/core";

const React = EZJSX.JSX;

export function JSXExample(holder: EZDiv) {
  const myDiv = new EZElement('div').addStyles({color: 'green'}).setTextContent('myDiv');
  let clickDiv: AnyEZElement;
  let explicitDiv;
  let nestedDiv;
  let someComplex;
  let simpleDiv;
  holder.append(<div>
    <h3>Various JSX usage</h3>
    <p>Source shows how JSX can be used to construct and append EZElements</p>
    <div style={'background-color: red;'}><span>style string div</span></div>
    <div style={{backgroundColor: 'green'}}>style object div</div>
    {clickDiv = <div onClick={() => {
      clickDiv.append(' - clicked')
    }}>clickDiv</div>}
    {explicitDiv = React.createElement('div', {style: 'color: red;'})}
    {simpleDiv = <div className={'some-class'} style={{'color': 'orange'}}>simpleDiv</div>}
    {myDiv}
    {nestedDiv = new EZElement('div').addStyles({color: 'blue'}).setTextContent('nestedDiv')}
    {someComplex = <SomeComplex text={"foo"}/>}
    {SFC({content: 'invoked explicitly'}).addStyles({color: 'violet'})}
    <SFC content={'as JSX attrs'}/>
  </div>);

  explicitDiv.setTextContent("This was explicitDiv");
  simpleDiv.append(" - simpleDiv.modified");
  nestedDiv.append(' - nestedDiv.modified');
  someComplex.addStyles({color: 'indigo'}).append(' - SomeComplex.modified');
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

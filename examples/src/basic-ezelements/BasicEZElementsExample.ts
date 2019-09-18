import { ez, EZDiv, EZElement, EZSpan } from 'ez-elements';

export function BasicEZElementsExample() {
  return ez('div').append(
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
    )
  );
}

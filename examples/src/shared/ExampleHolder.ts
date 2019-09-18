import { AnyEZElement, ez } from 'ez-elements';

export function ExampleHolder(element: AnyEZElement) {
  return ez('div').append(
    ez('div')
      .addStyles({
        padding: '5px',
        display: 'inline-block',
        fontWeight: 'bold'
      })
      .setTextContent('Example'),
    ez('div')
      .addStyles({
        border: '1px solid black',
        marginBottom: '10px',
        padding: '10px'
      })
      .append(element)
  );
}

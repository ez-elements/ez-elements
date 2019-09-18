import {
  AnyEZElement,
  extractStyleContents,
  ez,
  EZButton,
  EZDiv,
  EZShadowElement,
  EZTextInput
} from 'ez-elements';

const textInputClassName = 'text-input';
const holderClassName = 'holder';

// Use a style tag to enable IDE-highlighting - the css string must be without the tag so it is stripped
// using extractStyleContents.
const css = extractStyleContents(`<style>
  :host {
    border: 1px solid blue;
    background-color: orange;
    display: block;
  }
  .${textInputClassName} {
    margin: 10px;
    padding: 5px;
    color: orange;
  }
  .${holderClassName} {
    padding: 10px;
  }
</style>`);

export type ListChild = AnyEZElement & {
  getQueryText: () => string;
};

export class FilterableStaticList extends EZShadowElement<'div'> {
  private input: EZTextInput;
  private holder: EZDiv;
  private children: Array<ListChild> = [];
  private filter: string = '';

  constructor() {
    super('div');

    this.setShadowStyle(css).append(
      (this.input = new EZTextInput(value => {
        this.applyFilter(value);
      }).addClass(textInputClassName)),

      ez('div').append(
        new EZButton(() => {
          this.input.setValue('1');
        }).setTextContent('Set to "1"'),
        new EZButton(() => {
          this.input.setValue('2');
        }).setTextContent('Set to "2"')
      ),

      (this.holder = new EZDiv().addClass(holderClassName))
    );
  }

  public setChildren(children: Array<ListChild>): this {
    this.children = children;
    this.applyFilter(this.filter);
    return this;
  }

  private applyFilter(filter: string) {
    this.filter = filter;
    const lowercaseFilter = filter.toLowerCase();
    const filteredChildren = this.children.filter((child: ListChild) => {
      return (
        child
          .getQueryText()
          .toLowerCase()
          .indexOf(lowercaseFilter) !== -1
      );
    });

    this.holder.applyChildren(filteredChildren);
  }
}

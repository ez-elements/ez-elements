import { ez, EZButton, EZElement } from 'ez-elements';

type ToggleIconTextButtonProps = {
  activeIcon: string;
  activeText: string;
  inactiveIcon: string;
  inactiveText: string;
};

export class ToggleIconTextButton extends EZButton {
  private props: ToggleIconTextButtonProps;
  private icon: EZElement<'div'>;
  private text: EZElement<'div'>;

  constructor(
    props: ToggleIconTextButtonProps,
    cb: (active: boolean) => void,
    private active: boolean = false
  ) {
    super(() => {
      this.setActive(!this.active);
      cb(this.active);
    });
    this.props = props;

    this.append((this.icon = ez('div')), (this.text = ez('div')));
    this.setActive(this.active);
  }

  setActive(active: boolean) {
    this.active = active;

    if (this.active) {
      this.icon.setTextContent(this.props.activeIcon);
      this.text.setTextContent(this.props.activeText);
    } else {
      this.icon.setTextContent(this.props.inactiveIcon);
      this.text.setTextContent(this.props.inactiveText);
    }
  }
}

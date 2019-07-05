/** @internal */
export type NativeElement = keyof HTMLElementTagNameMap;

/** @internal */
export type AnyEZElement = EZElement<NativeElement>;

type Appendable =
  | AppendableArray
  | { element: HTMLElement }
  | AnyEZElement
  | HTMLElement
  | string;

interface AppendableArray extends Array<Appendable> {}

/** @internal */
export class EZElement<K extends NativeElement> {
  private element: HTMLElementTagNameMap[K];

  // By default any child elements will be added to the element itself.
  // Having a separate reference to the child container allows overriding
  // this behaviour and creating a "holder".
  private childContainer: DocumentFragment | HTMLElement;

  constructor(arg: K | HTMLElementTagNameMap[K]) {
    if (typeof arg === 'string') {
      this.element = document.createElement(arg);
    } else {
      this.element = arg as HTMLElementTagNameMap[K];
    }
    this.childContainer = this.element;

    this.setAttribute('data-class-name', this.constructor.name);
  }

  //region Meta
  public getNativeElement(): HTMLElementTagNameMap[K] {
    return this.element;
  }

  public getChildContainer(): DocumentFragment | HTMLElement {
    return this.childContainer;
  }

  public static unwrapEZElement(el: AnyEZElement | HTMLElement): HTMLElement {
    if (EZElement.isEZElement(el)) {
      return el.getNativeElement();
    }
    return el;
  }

  // @ts-ignore - used in internal runtime type check
  private isEZElement(): boolean {
    return true;
  }

  public static isEZElement(el: any): el is AnyEZElement {
    return Boolean(
      el &&
        el.__proto__ &&
        el.__proto__.isEZElement &&
        el.__proto__.isEZElement()
    );
  }

  //endregion

  //region Override Child Container
  public setChildContainer(
    childContainer: DocumentFragment | HTMLElement
  ): this {
    if (
      !(
        childContainer instanceof DocumentFragment ||
        childContainer instanceof HTMLElement
      )
    ) {
      throw new Error(
        'child container must be a DocumentFragment or a HTMLElement'
      );
    }
    this.childContainer = childContainer;
    return this;
  }

  //endregion

  //region Child diffing
  public applyChildren(
    wrappedChildren: Array<
      AnyEZElement | HTMLElement | { element: HTMLElement } | string
    >
  ): this {
    const nativeElement = this.childContainer;
    const children = wrappedChildren.map(EZElement.toAppendable);
    const childrenSet = new Set(children);

    // Determine which of the desired children are not yet in the element and add them to a
    // fragment that will be appended in a single operation.
    const existingElementChildren = new Set(
      Array.from(nativeElement.childNodes)
    );
    const notYetPresentChildren = children.filter(child => {
      return !existingElementChildren.has(child);
    });
    const frag = document.createDocumentFragment();
    frag.append(...notYetPresentChildren);
    nativeElement.prepend(frag);

    // Determine which of the existing children are not in the desired state of the element.
    const existingChildren = Array.from(nativeElement.childNodes);
    const removingChildren = existingChildren.filter(
      child => !childrenSet.has(child as HTMLElement)
    );

    // Add the children that should be removed from the element to
    // a new fragment (which removes them from the existing element)
    document.createDocumentFragment().append(...removingChildren);

    // Avoid the unintended side-effect of the removed children
    // being part of the unattached document fragment
    for (const child of removingChildren) {
      child.remove();
    }

    let previousChild: ChildNode | null = null;
    let nextChild = nativeElement.firstChild;
    // enforce the order that the children were passed with
    for (let i = 0; i < children.length; i++) {
      const expectedNode = children[i];
      if (expectedNode !== nextChild) {
        if (previousChild === null) {
          nativeElement.prepend(expectedNode);
        } else {
          previousChild.after(expectedNode);
        }
      }
      previousChild = expectedNode;
      nextChild = expectedNode.nextSibling;
    }

    return this;
  }

  //endregion

  //region append/prepend
  public append(...children: AppendableArray): this {
    for (const child of children) {
      if (Array.isArray(child)) {
        this.append(...child);
      } else {
        this.childContainer.append(EZElement.toAppendable(child));
      }
    }
    return this;
  }

  public prepend(...children: AppendableArray): this {
    for (const child of children.reverse()) {
      if (Array.isArray(child)) {
        this.prepend(...child);
      } else {
        this.childContainer.prepend(EZElement.toAppendable(child));
      }
    }
    return this;
  }

  //endregion

  //region placement
  public appendTo(parent: AnyEZElement | HTMLElement): this {
    parent.append(this.element);
    return this;
  }

  public prependTo(parent: AnyEZElement | HTMLElement): this {
    parent.prepend(this.element);
    return this;
  }

  public replaceWith(other: AnyEZElement | HTMLElement): this {
    this.element.replaceWith(EZElement.unwrapEZElement(other));
    return this;
  }

  public removeFromParent(): this {
    const parent = this.element.parentNode;
    if (parent) {
      parent.removeChild(this.element);
    }
    return this;
  }

  //endregion

  //region Parent
  public getParent(): Node & ParentNode | null {
    return this.element.parentNode;
  }

  //endregion

  //region Children
  public getChild(index: number): ChildNode | null {
    return this.childContainer.childNodes[index] || null;
  }

  public getChildren(): Array<ChildNode> {
    return Array.from(this.childContainer.childNodes);
  }

  public contains(node: Node | AnyEZElement | null): boolean {
    if (EZElement.isEZElement(node)) {
      return this.element.contains(node.element);
    }
    return this.element.contains(node);
  }

  //endregion

  //region Classes
  public addClass(...classNames: Array<string>): this {
    this.element.classList.add(...classNames);
    return this;
  }

  public setClasses(classObj: { [key: string]: boolean }): this {
    Object.entries(classObj).forEach(([className, enabled]) => {
      if (enabled) {
        this.addClass(className);
      } else {
        this.removeClass(className);
      }
    });
    return this;
  }

  public removeClass(...classNames: Array<string>): this {
    this.element.classList.remove(...classNames);
    return this;
  }

  public get classList(): DOMTokenList {
    return this.element.classList;
  }

  //endregion

  //region Style
  public addStyles(styles: Partial<CSSStyleDeclaration>): this {
    Object.assign(this.style, styles);
    return this;
  }

  public get style(): CSSStyleDeclaration {
    return this.element.style;
  }

  //endregion

  //region Attributes
  public addAttributes(attributes: { [key: string]: string }): this {
    Object.entries(attributes).forEach(([key, value]) => {
      this.setAttribute(key, value);
    });
    return this;
  }

  public setAttribute(attrName: string, val: string): this {
    this.element.setAttribute(attrName, val);
    return this;
  }

  public removeAttribute(attrName: string): this {
    this.element.removeAttribute(attrName);
    return this;
  }

  public get attributes(): NamedNodeMap {
    return this.element.attributes;
  }

  public getAttribute(attrName: string): string | null {
    return this.element.getAttribute(attrName);
  }

  //endregion

  //region Events
  public addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.element.addEventListener(type, listener, options);
    return this;
  }

  public removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.element.removeEventListener(type, listener, options);
    return this;
  }

  public isEventTarget(event: Event): boolean {
    return event.target === this.element;
  }

  public containsEventTarget(event: Event): boolean {
    if (this.isEventTarget(event)) {
      return true;
    }
    return this.contains(event.target as Node | null);
  }

  public onClick(cb: (event: MouseEvent) => void): this {
    return this.addEventListener('click', cb);
  }

  //endregion

  //region TextContent
  public setTextContent(text: string): this {
    this.element.textContent = text;
    return this;
  }

  public getTextContent(): string | null {
    return this.element.textContent;
  }

  //endregion

  private static toAppendable(
    child: AnyEZElement | HTMLElement | { element: HTMLElement } | string
  ): Text | HTMLElement {
    if (EZElement.isEZElement(child)) {
      return child.element;
    } else if (child instanceof HTMLElement) {
      return child;
    } else if (typeof child === 'string') {
      return document.createTextNode(child);
    } else if (child && child.element !== undefined) {
      return child.element;
    } else {
      throw new Error('Unrecognized child argument');
    }
  }
}

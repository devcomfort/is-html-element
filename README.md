# is-html-element

Type-safe utility to check if an element is an HTMLElement or a specific HTML type.

## Installation

To install the package, run the following command:

```bash
pnpm add is-html-element
```

or using npm:

```bash
npm install is-html-element
```

## Usage

The `isHTMLElement` function checks if a given element is an `HTMLElement` or a specific HTML element type. It is a type guard function that narrows the type of the element.

### Example

```typescript
import { isHTMLElement } from 'is-html-element';

const divElement = document.createElement('div');

// Check if the element is an HTMLElement
if (isHTMLElement(divElement)) {
  console.log(divElement.tagName); // TypeScript knows divElement is an HTMLElement
}

// Check if the element is a specific HTML element type
if (isHTMLElement(divElement, 'div')) {
  console.log(divElement); // TypeScript knows divElement is an HTMLDivElement
}

// TypeScript provides auto-completion for tagName using generics
if (isHTMLElement(divElement, 'span')) { // 'span' is auto-completed
  console.log(divElement); // TypeScript knows divElement is an HTMLSpanElement
}
```

## API Documentation

### `isHTMLElement(element: unknown): element is HTMLElement`

Checks if the given element is an `HTMLElement`. This is a type guard that narrows the type to `HTMLElement`.

### `isHTMLElement<K extends keyof HTMLElementTagNameMap>(element: unknown, tagName: K): element is HTMLElementTagNameMap[K]`

Checks if the given element is a specific HTML element type. This is a type guard that narrows the type to the specific HTML element type corresponding to `tagName`. TypeScript provides auto-completion for `tagName` based on the `HTMLElementTagNameMap`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/devcomfort/is-html-element).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

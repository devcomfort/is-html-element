# is-html-element

A type-safe, lightweight, and dependency-free utility to accurately validate HTML elements in TypeScript.

## Motivation: The Problem with `instanceof`

In TypeScript, using `instanceof` to check an element's type seems straightforward, but it's often unreliable for ensuring type safety. The core issue is that many HTML elements don't have a specific interface (like `HTMLDivElement`) and default to the generic `HTMLElement`.

Our comprehensive tests, which you can run yourself, reveal a significant gap in accuracy:

| Method          | Accuracy                          |
| --------------- | --------------------------------- |
| `isHTMLElement` | **112/112 (100.00%)**             |
| `instanceof`    | **73/112 (~65.18%)**              |

This means `instanceof` is unable to distinguish between **39 different types of HTML elements**, including crucial semantic tags like `<article>`, `<section>`, `<nav>`, and `<summary>`. Relying on it can lead to less precise types and potential runtime errors.

`isHTMLElement` solves this problem by using the element's `tagName`, providing a 100% reliable way to validate elements and empower your type guards.

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

## Running Tests

This project includes a comprehensive test suite to ensure its reliability. You can run the tests using the following commands:

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test
```

The test suite is divided into two main files:

-   `src/is-html-element.test.ts`: This is a unit test file that verifies the core functionality of the `isHTMLElement` function. It checks for correct behavior with valid elements, various invalid inputs, and ensures its type-guarding mechanism works as expected.
-   `src/motivation.test.ts`: This file generates the comparative analysis report shown in the "Motivation" section. Its purpose is to quantitatively demonstrate why `isHTMLElement` is a superior and necessary tool compared to using `instanceof` alone.

## A Note on Future Compatibility & Maintenance

The relevance of this library is tied to the current state of the DOM API specification. The web platform is constantly evolving.

-   **If Browsers Evolve**: If, in the future, all HTML elements are assigned their own specific constructor class (e.g., `HTMLSummaryElement`), the problem this library solves will diminish, and `instanceof` may become a viable alternative.
-   **If New Elements Are Added**: Conversely, if new elements are added to the HTML standard without a specific interface, this library's utility will increase.

To ensure this library remains accurate and relevant, the list of HTML tags in our test files (`motivation.test.ts` and `is-html-element.test.ts`) should be periodically updated to match the latest [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#elements_and_their_interfaces) or the official HTML Standard. Running the `motivation.test.ts` suite is the best way to continuously verify the library's necessity based on the current state of web standards.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/devcomfort/is-html-element).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

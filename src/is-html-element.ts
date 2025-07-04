/// <reference lib="dom" />

/**
 * Checks if a given value is an instance of HTMLElement.
 *
 * @param element The value to check.
 * @returns `true` if the value is an HTMLElement, otherwise `false`.
 *
 * @example
 * ```typescript
 * const divElement = document.createElement('div');
 * isHTMLElement(divElement); // true
 * ```
 */
export function isHTMLElement(element: unknown): element is HTMLElement;

/**
 * Checks if a given element is a specific HTML element type by its tag name,
 * providing a reliable, type-safe alternative to `instanceof`.
 *
 * This is necessary because many HTML elements (~35% of all standard tags,
 * including `<article>`, `<section>`, etc.) lack a specific constructor
 * interface and all resolve to `HTMLElement`, making them indistinguishable
 * via `instanceof`. This function uses `tagName` for an accurate check.
 *
 * @typeParam K - The type of HTML element to check for (e.g., 'div', 'a').
 * @param element - The element to validate.
 * @param tagName - The specific HTML tag name to check against.
 * @returns Whether the element is an HTMLElement with the specified tag name.
 *
 * @example
 * ```typescript
 * const divElement = document.createElement('div');
 * isHTMLElement(divElement, 'div'); // true
 * isHTMLElement(divElement, 'span'); // false
 *
 * if (isHTMLElement(divElement, 'div')) {
 *   // divElement is now correctly typed as HTMLDivElement
 * }
 * ```
 */
export function isHTMLElement<K extends keyof HTMLElementTagNameMap>(
    element: unknown,
    tagName: K
): element is HTMLElementTagNameMap[K];

/**
 * Implementation of isHTMLElement. This function is necessary because many
 * HTML elements do not have a specific constructor interface, making `instanceof`
 * unreliable for distinguishing between them. This function uses the `tagName`
 * property for a reliable check.
 */
export function isHTMLElement<K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap>(
    element: unknown,
    tagName?: K
): element is K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement {
    // First, check if the element is an instance of HTMLElement.
    if (!(element instanceof HTMLElement)) return false;

    // If tagName is not provided, return whether it's an HTMLElement.
    if (tagName === undefined) return true;

    // When tagName is provided, compare it case-insensitively.
    return element.tagName.toLowerCase() === tagName;
}

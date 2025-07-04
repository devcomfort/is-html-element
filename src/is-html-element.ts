/**
 * Checks if the given element is an HTMLElement.
 * 
 * @example
 * ```typescript
 * const divElement = document.createElement('div');
 * isHTMLElement(divElement); // true
 * ```
 */
export function isHTMLElement(element: unknown): element is HTMLElement;

/**
 * Checks if the given element is a specific HTML element type.
 * 
 * @typeParam K - The type of HTML element to check against (e.g., 'div', 'span', 'a')
 * @param element - The element to validate
 * @param tagName - The specific HTML tag name to check against
 * @returns Whether the element matches the specified tag name
 * 
 * @example
 * ```typescript
 * const divElement = document.createElement('div');
 * isHTMLElement(divElement, 'div'); // true
 * isHTMLElement(divElement, 'span'); // false
 * ```
 */
export function isHTMLElement<K extends keyof HTMLElementTagNameMap>(
    element: unknown,
    tagName: K
): element is HTMLElementTagNameMap[K];

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

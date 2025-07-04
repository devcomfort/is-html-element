import { describe, expect, expectTypeOf, it } from 'vitest';
import { isHTMLElement } from './is-html-element';

/**
 * The list of all standard HTML tags.
 *
 * @note This list should be periodically updated to reflect the latest HTML
 * standard to ensure the accuracy of the tests.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#elements_and_their_interfaces
 */
const ALL_HTML_TAGS = [
    "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base",
    "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption",
    "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del",
    "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset",
    "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6",
    "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input",
    "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark",
    "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup",
    "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt",
    "ruby", "s", "samp", "script", "search", "section", "select", "slot",
    "small", "source", "span", "strong", "style", "sub", "summary", "sup",
    "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead",
    "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"
] as const;

/**
 * Test suite for isHTMLElement, focusing on its core functionality and type-safety.
 */
describe('isHTMLElement', () => {

    describe('Valid HTML Elements', () => {
        /**
         * Verifies that the function returns `true` for any valid HTML element,
         * regardless of whether it has a specific interface (like HTMLDivElement) or
         * a generic one (like HTMLElement for <summary>). This is the baseline check
         * for all element-like objects.
         */
        it('should return true for any element that is an instance of HTMLElement', () => {
            // Test a standard element
            expect(isHTMLElement(document.createElement('div'))).toBe(true);
            // Test an element with a generic constructor
            expect(isHTMLElement(document.createElement('summary'))).toBe(true);
        });

        /**
         * Programmatically iterates through all standard HTML tags to ensure that
         * `isHTMLElement` correctly identifies each one when the matching `tagName`
         * is provided. This comprehensive check guarantees broad support across
         * the entire HTML element specification.
         */
        it('should return true for all standard HTML tags when the tag name matches', () => {
            for (const tagName of ALL_HTML_TAGS) {
                const element = document.createElement(tagName);
                expect(isHTMLElement(element, tagName), `Failed for tag: <${tagName}>`).toBe(true);
            }
        });

        /**
         * Ensures the function correctly returns `false` when the provided `tagName`
         * does not match the actual element's tag. This guards against false positives
         * and confirms the accuracy of the tag-specific check.
         */
        it('should return false when the tag name does not match', () => {
            const divElement = document.createElement('div');
            expect(isHTMLElement(divElement, 'span')).toBe(false);
            expect(isHTMLElement(divElement, 'a')).toBe(false);
        });
    });

    describe('Invalid and Non-Element Inputs', () => {
        /**
         * This test acts as a safeguard to ensure the function is robust against
         * common non-element values. It checks `null`, `undefined`, plain objects,
         * strings, and other non-element node types to prevent runtime errors and
         * ensure strictness.
         */
        it('should return false for various non-element inputs', () => {
            expect(isHTMLElement(null), 'null').toBe(false);
            expect(isHTMLElement(undefined), 'undefined').toBe(false);
            expect(isHTMLElement({}), 'plain object').toBe(false);
            expect(isHTMLElement([]), 'array').toBe(false);
            expect(isHTMLElement('a string'), 'string').toBe(false);
            expect(isHTMLElement(123), 'number').toBe(false);
            expect(isHTMLElement(document.createTextNode('text')), 'TextNode').toBe(false);
            expect(isHTMLElement(document.createComment('comment')), 'CommentNode').toBe(false);
        });

        /**
         * Verifies that providing a `tagName` string that is not a valid HTML tag
         * (i.e., not a key in `HTMLElementTagNameMap`) correctly returns `false`.
         * The `@ts-expect-error` directive confirms that TypeScript correctly flags
         * this as a type error at compile time, which is a key feature.
         */
        it('should return false for a tagName that is not a valid key in HTMLElementTagNameMap', () => {
            const element = document.createElement('div');
            // @ts-expect-error - Intentionally testing an invalid tag name.
            expect(isHTMLElement(element, 'invalid-tag-name')).toBe(false);
        });
    });

    describe('Type Guard Behavior', () => {
        /**
         * This is the most critical test for the library's primary feature. It
         * confirms that when `isHTMLElement` is used with a specific tag name,
         * TypeScript correctly narrows the element's type within the `if` block.
         * For example, checking for 'a' narrows the type to `HTMLAnchorElement`,
         * allowing safe access to tag-specific properties like `.href`.
         */
        it('should narrow the type to a specific element interface when a tagName is provided', () => {
            const element: unknown = document.createElement('a');

            if (isHTMLElement(element, 'a')) {
                // The type is correctly narrowed to HTMLAnchorElement.
                expectTypeOf(element).toEqualTypeOf<HTMLAnchorElement>();
            } else {
                // This block should be unreachable in this test.
                expect.fail('Type guard failed to narrow the type correctly.');
            }
        });

        /**
         * Tests the function's overloaded signature. When no `tagName` is provided,
         * this test ensures the type is still correctly narrowed from `unknown` to the
         * general `HTMLElement` type. This provides a useful, broader type guard
         * when specificity is not required.
         */
        it('should narrow the type to the general HTMLElement when no tagName is provided', () => {
            const element: unknown = document.createElement('div');

            if (isHTMLElement(element)) {
                // The type is correctly narrowed to HTMLElement.
                expectTypeOf(element).toEqualTypeOf<HTMLElement>();
            } else {
                // This block should be unreachable in this test.
                expect.fail('Type guard failed to narrow the type correctly.');
            }
        });
    });
});

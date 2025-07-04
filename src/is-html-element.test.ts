import { describe, expect, it } from 'vitest';
import { isHTMLElement } from './is-html-element';

/**
 * Test suite for the isHTMLElement function.
 */
describe('isHTMLElement', () => {
    /**
     * Test that it returns true for HTMLElement instances.
     */
    it('should return true for HTMLElement instances', () => {
        const divElement = document.createElement('div');
        expect(isHTMLElement(divElement)).toBe(true);
    });

    /**
     * Test that it returns false for non-HTMLElement instances.
     */
    it('should return false for non-HTMLElement instances', () => {
        expect(isHTMLElement({})).toBe(false);
        expect(isHTMLElement('div')).toBe(false);
        expect(isHTMLElement(null)).toBe(false);
        expect(isHTMLElement(undefined)).toBe(false);
    });

    /**
     * Test that it returns true when tagName matches.
     */
    it('should return true when tagName matches', () => {
        const divElement = document.createElement('div');
        expect(isHTMLElement(divElement, 'div')).toBe(true);
    });

    /**
     * Test that it returns false when tagName does not match.
     */
    it('should return false when tagName does not match', () => {
        const divElement = document.createElement('div');
        expect(isHTMLElement(divElement, 'span')).toBe(false);
    });

    /**
     * Test that it returns true when tagName is not provided and element is HTMLElement.
     */
    it('should return true when tagName is not provided and element is HTMLElement', () => {
        const divElement = document.createElement('div');
        expect(isHTMLElement(divElement)).toBe(true);
    });

    /**
     * Test that it returns undefined for invalid tagName.
     */
    it('should return undefined for invalid tagName', () => {
        const divElement = document.createElement('div');
        const invalidTag = generateRandomTag().toLowerCase();
        // @ts-expect-error - Invalid tag name
        expect(isHTMLElement(divElement, invalidTag)).toBeUndefined();
    });
});

/**
 * Generates a random tag name using window.crypto.
 */
function generateRandomTag(): string {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return `invalidTag-${array[0].toString(36)}`;
}

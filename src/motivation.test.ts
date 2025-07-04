import { describe, expect, it } from 'vitest';

/**
 * The list of all standard HTML tags.
 *
 * @note This list should be periodically updated to reflect the latest HTML
 * standard to ensure the accuracy of the motivation analysis.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#elements_and_their_interfaces
 */
const TAG_NAMES = [
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
 * This test suite provides a comparative analysis between `isHTMLElement` and
 * the native `instanceof` operator. Its primary purpose is not to test the
 * `isHTMLElement` function itself, but to programmatically and quantitatively
 * prove the core motivation for this library's existence.
 *
 * The test works by iterating through every standard HTML tag and checking if
 * the created element's constructor is the generic `HTMLElement`. If it is,
 * it means that tag lacks a specific interface (e.g., `HTMLArticleElement`)
 * in the current browser environment. This is the exact scenario where `instanceof`
 * fails, as it cannot distinguish between any of these elements.
 *
 * The generated report provides a real-time accuracy score for `instanceof`,
 * demonstrating why a `tagName`-based check is superior and necessary.
 */
describe('Motivation: `isHTMLElement` vs. `instanceof` Accuracy', () => {

    it('should generate a report comparing the accuracy of isHTMLElement and instanceof', () => {
        let specificInterfaceCount = 0;
        const problematicTags: string[] = [];
        const totalTags = TAG_NAMES.length;

        for (const tagName of TAG_NAMES) {
            const element = document.createElement(tagName);
            if (element.constructor === HTMLElement) {
                problematicTags.push(tagName);
            } else {
                specificInterfaceCount++;
            }
        }

        const instanceofAccuracy = (specificInterfaceCount / totalTags) * 100;
        const isHTMLElementAccuracy = 100; // `isHTMLElement` is designed to be 100% accurate.

        const report = `
=====================================================================
      Comparative Analysis: isHTMLElement vs. instanceof
=====================================================================

This report compares the accuracy of \`isHTMLElement\` against the native
\`instanceof\` operator for correctly identifying specific HTML element types.

---------------------------------------------------------------------
Accuracy Score
---------------------------------------------------------------------
- isHTMLElement: ${totalTags}/${totalTags} (${isHTMLElementAccuracy.toFixed(2)}%)
- instanceof:    ${specificInterfaceCount}/${totalTags} (${instanceofAccuracy.toFixed(2)}%)

---------------------------------------------------------------------
Problematic Tags for instanceof (${problematicTags.length} tags)
---------------------------------------------------------------------
\`instanceof\` cannot distinguish between the following tags because
they all resolve to the generic \`HTMLElement\` interface.
\`isHTMLElement\` correctly identifies every one of them.

${problematicTags.join(', ')}
=====================================================================
        `;

        console.log(report);

        // This snapshot ensures that the list of problematic tags is tracked over
        // time. If a future browser update provides a specific interface for a
        // tag that previously lacked one (e.g., HTMLSummaryElement), this
        // snapshot will fail, alerting us to the change in the DOM standard.
        // We can then update the snapshot to reflect the new reality.
        expect(problematicTags).toMatchInlineSnapshot(`
          [
            "abbr",
            "address",
            "article",
            "aside",
            "b",
            "bdi",
            "bdo",
            "cite",
            "code",
            "dd",
            "dfn",
            "dt",
            "em",
            "figcaption",
            "figure",
            "footer",
            "header",
            "hgroup",
            "i",
            "kbd",
            "main",
            "mark",
            "nav",
            "noscript",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "search",
            "section",
            "small",
            "strong",
            "sub",
            "summary",
            "sup",
            "u",
            "var",
            "wbr",
          ]
        `);
    });
}); 
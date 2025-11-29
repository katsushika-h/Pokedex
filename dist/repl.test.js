import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";
describe.each([
    { input: "  hello  world  ", expected: ["hello", "world"], },
    { input: "TESTing 123", expected: ["testing", "123"] },
    { input: "   Multiple    Spaces   Here   ", expected: ["multiple", "spaces", "here"] },
    { input: "SingleWord", expected: ["singleword"] },
    { input: "   ", expected: [""] },
    { input: "MixEd CaSe InPuT", expected: ["mixed", "case", "input"] },
    { input: "LeadingAndTrailingSpaces   ", expected: ["leadingandtrailingspaces"] },
    { input: "   Tabs\tand\nNewLines", expected: ["tabs", "and", "newlines"] },
    { input: "the QuiCk BROWN fox", expected: ["the", "quick", "brown", "fox"] },
    // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval + 200));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});

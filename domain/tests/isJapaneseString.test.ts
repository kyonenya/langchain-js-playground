import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isJapaneseString } from '../isJapaneseString';

describe('isJapaneseString', () => {
  it('should return `true` for Japanese string', () => {
    equal(isJapaneseString('これは日本語の文です。'), true);
    equal(isJapaneseString('私は English を話すことができます。'), true); // Mixed, but more Japanese
  });

  it('should return `false` for English string', () => {
    equal(isJapaneseString('This is an English sentence.'), false);
    equal(isJapaneseString('I can speak 日本語 fluently.'), false); // Mixed, but more English
    equal(isJapaneseString('12345'), false); // When in doubt, default to English
  });
});

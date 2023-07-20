export function isJapaneseString(input: string): boolean {
  const englishRegExp = /[a-zA-Z]/g;
  const japaneseRegExp =
    /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ーａ-ｚＡ-Ｚ々〆〤]/gu;

  const englishMatches = (input.match(englishRegExp) || []).length;
  const japaneseMatches = (input.match(japaneseRegExp) || []).length;

  return japaneseMatches > englishMatches;
}

import { isFullUrl, isFullUrlOrNull, isSlug, isThreeWordsSnakeCase, isTwoWordsSnakeCase } from '../format';

// IS TWO WORDS SNAKE CASE
describe('isTwoWordsSnakeCase utils', () => {
  it('should return false: only one word', () => {
    const text = 'hello';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: begin with underscore', () => {
    const text = '_world';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: end with underscore', () => {
    const text = 'world_';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return true: snake case with two words', () => {
    const text = 'hello_world';
    expect(isTwoWordsSnakeCase(text)).toEqual(true);
  });

  it('should return false: with  2 or more _', () => {
    const text = 'hello__world';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: with + 2 words', () => {
    const text = 'hello_world_and_other_things';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no uppercase even if only one word', () => {
    const text = 'Hello';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no uppercase even if on snake case format', () => {
    const text = 'Hello_World';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no space', () => {
    const text = 'hello world';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return true: snake case with number', () => {
    const text = 'hello_world5';
    expect(isTwoWordsSnakeCase(text)).toEqual(true);
  });
});

// IS TWO WORDS SNAKE CASE
describe('isThreeWordsSnakeCase utils', () => {
  it('should return false: only one word', () => {
    const text = 'hello';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: begin with underscore', () => {
    const text = '_world';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: end with underscore', () => {
    const text = 'world_';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: snake case with two words', () => {
    const text = 'hello_world';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return true: snake case with three words', () => {
    const text = 'hello_world_yes';
    expect(isThreeWordsSnakeCase(text)).toEqual(true);
  });

  it('should return false: with + 2 words', () => {
    const text = 'hello_world_and_other_things';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: with  2 or more _', () => {
    const text = 'hello__world_yes';
    expect(isTwoWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no uppercase even if only one word', () => {
    const text = 'Hello';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no uppercase even if on snake case format', () => {
    const text = 'Hello_World';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: no space', () => {
    const text = 'hello world';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return false: snake case with number', () => {
    const text = 'hello_world5';
    expect(isThreeWordsSnakeCase(text)).toEqual(false);
  });

  it('should return true: snake case with number', () => {
    const text = 'hello_world5_yes';
    expect(isThreeWordsSnakeCase(text)).toEqual(true);
  });
});

// IS FULL URL
describe('isFullUrl utils', () => {
  it('should return true: full http url', () => {
    const text = 'http://www.google.com';
    expect(isFullUrl(text)).toEqual(true);
  });

  it('should return true: full https url', () => {
    const text = 'https://www.google.com';
    expect(isFullUrl(text)).toEqual(true);
  });

  it('should return true: without subdomain url', () => {
    const text = 'https://google.com';
    expect(isFullUrl(text)).toEqual(true);
  });

  it('should return true: with path', () => {
    const text = 'https://google.com/path';
    expect(isFullUrl(text)).toEqual(true);
  });

  it('should return true: with path and query string', () => {
    const text = 'https://google.com/path?query=string';
    expect(isFullUrl(text)).toEqual(true);
  });

  it('should return true: with path and hash', () => {
    const text = 'https://google.com/path?query=string#hash';
    expect(isFullUrl(text)).toEqual(true);
  });
});

// IS SLUG
describe('isSlug utils', () => {
  it('should return true: only one word', () => {
    const text = 'hello';
    expect(isSlug(text)).toEqual(true);
  });

  it('should return false: begin with underscore', () => {
    const text = '_world';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return false: end with underscore', () => {
    const text = 'world_';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return true: snake case with two words', () => {
    const text = 'hello_world';
    expect(isSlug(text)).toEqual(true);
  });

  it('should return false: with  2 or more _', () => {
    const text = 'hello__world';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return true: with + 2 words', () => {
    const text = 'hello_world-and_other-things';
    expect(isSlug(text)).toEqual(true);
  });

  it('should return false: no uppercase even if only one word', () => {
    const text = 'Hello';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return false: no uppercase even if on snake case format', () => {
    const text = 'Hello_World';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return false: no space', () => {
    const text = 'hello world';
    expect(isSlug(text)).toEqual(false);
  });

  it('should return true: snake case with number', () => {
    const text = 'hello-world_5';
    expect(isSlug(text)).toEqual(true);
  });
});

// IS NULL OR FULL URL
describe('isFullUrlOrNull utils', () => {
  it('should return true: undefined', () => {
    const text = undefined;
    expect(isFullUrlOrNull(text)).toEqual(true);
  });

  it('should return true: null', () => {
    const text = null;
    expect(isFullUrlOrNull(text)).toEqual(true);
  });

  it('should return true: full url', () => {
    const text = 'https://google.com/path?query=string#hash';
    expect(isFullUrlOrNull(text)).toEqual(true);
  });

  it('should return false: wrong url', () => {
    const text = 'https://google';
    expect(isFullUrlOrNull(text)).toEqual(false);
  });
});

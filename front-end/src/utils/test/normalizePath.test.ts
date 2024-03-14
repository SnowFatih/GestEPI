import { buildPath, normalizePath } from '../normalizePath';

describe('normalizePath utils tests', () => {
  test.each([
    ['/path/to/folder', '/path/to/folder'],
    ['/path/to/folder/', '/path/to/folder/'],
    ['///path/to/folder/', '/path/to/folder/'],
    ['///path/to//folder/', '/path/to/folder/']
  ])('expect %s to be normalized as %s', (path, result) => {
    expect(normalizePath(path)).toEqual(result);
  });
});

describe('buildPath utils tests', () => {
  test.each([
    ['/path/to/folder', 'filename', '.jpg', '/path/to/folder/filename.jpg'],
    ['/path/to/folder/', 'filename', '.jpg', '/path/to/folder/filename.jpg'],
    ['///path/to/folder/', '/b/', '', '/path/to/folder/b/']
  ])('expect %s to be normalized as %s', (p1, p2, p3, result) => {
    expect(buildPath(p1, p2, p3)).toEqual(result);
  });
});

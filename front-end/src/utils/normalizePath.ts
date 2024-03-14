export const normalizePath = (path: string): string => {
  return path.replace(/[\\/]+/g, '/');
};

export const buildPath = (...paths: string[]): string => {
  const hasExtension = paths[paths.length - 1].startsWith('.');
  if (hasExtension) {
    const extension = paths.pop();
    return `${normalizePath(paths.join('/'))}${extension ?? ''}`;
  } else {
    return normalizePath(paths.join('/'));
  }
};

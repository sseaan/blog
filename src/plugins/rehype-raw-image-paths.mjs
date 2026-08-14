import { visit } from 'unist-util-visit';

const toSafeRelativeImagePath = (value) => {
  let decoded;
  try {
    decoded = decodeURI(value);
  } catch {
    return null;
  }

  if (!decoded || decoded.startsWith('/') || URL.canParse(decoded)) return null;
  return decoded;
};

export const rehypeRawImagePaths = () => (tree, file) => {
  file.data.astro ??= {};
  const localImagePaths = file.data.astro.localImagePaths ?? [];
  file.data.astro.localImagePaths = localImagePaths;
  const known = new Set(localImagePaths);

  visit(tree, 'element', (node) => {
    if (node.tagName !== 'img') return;
    const src = node.properties?.src;
    if (typeof src !== 'string') return;
    const relativePath = toSafeRelativeImagePath(src);
    if (!relativePath || known.has(relativePath)) return;
    known.add(relativePath);
    localImagePaths.push(relativePath);
  });
};

export function getDevProxyModule(module: string): undefined | string {
  return import.meta.env.PROD ? undefined : `${location.origin}/src/proxy/dev/${module}.ts`
}

export function getProdProxyModule(module: string): undefined | string {
  return import.meta.env.PROD ? `${location.origin}/imports/${module}.js` : `${location.origin}/src/proxy/prod/${module}.ts`
}

export function getFilenameFromPath(path: string): string {
  const segments = path.split('/');
  return segments[segments.length - 1] || path;
}

export function getTextFromPath(path: string): Promise<string> {
  return fetch(path).then(res => res.text());
}

export function encode(obj: string): string {
  return btoa(JSON.stringify(obj));
}

export function decode<T>(str: string): T {
  return JSON.parse(atob((str)));
}

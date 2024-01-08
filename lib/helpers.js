export function jsonParseSafe(data, fallback = {}) {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

export function successResponse(res, data) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ status: 'Success!', data }));
}

export function errorResponse(res, errorMessage) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ status: 'Failure (', message: errorMessage }));
}

export function matchesRoute(route, path, dynamicSymbol) {
  const storedRouteParts = splitURL(route);
  const requestedRouteParts = splitURL(path);

  if (storedRouteParts.length !== requestedRouteParts.length) return false;

  for (let i = 0; i < storedRouteParts.length; i++) {
    if (storedRouteParts[i].startsWith(dynamicSymbol)) continue;

    if (storedRouteParts[i] !== requestedRouteParts[i]) return false;
  }

  return true;
}

export function findMatch(path, routing) {
  let staticUrlRoute = routing.get(path);

  if (staticUrlRoute) return { storedPath: path, requestedPath: path, route: staticUrlRoute };

  for (const route of routing.keys()) {
    if (matchesRoute(route, path, '$')) return { storedPath: route, requestedPath: path, route: routing.get(route) };
  }

  return { storedPath: null, requestedPath: null, route: null };
}

export function extractParams(route, path, dynamicSymbol) {
  const storedRouteParts = splitURL(route);
  const requestedRouteParts = splitURL(path);

  const params = [];

  console.dir({ storedRouteParts, requestedRouteParts });

  for (let i = 0; i < storedRouteParts.length; i++) {
    if (storedRouteParts[i][0] === dynamicSymbol) params.push(requestedRouteParts[i]);
  }

  return params;
}

export const splitURL = (url) => url.split('/').filter((str) => str);

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

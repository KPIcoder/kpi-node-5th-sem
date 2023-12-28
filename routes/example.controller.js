export const getController = (req, res, payload) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ message: `Hello ${req.socket.remoteAddress}`, payload }));
};

export const postController = (req, res, payload) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ user: payload }));
};

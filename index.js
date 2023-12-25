import * as http from "node:http";

const PORT = 8000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  const message = "Hello client " + ip;

  res.end(message);
});

server.listen(PORT, HOST, () =>
  console.log(`Server listening on ${HOST}:${PORT}`),
);

server.on("error", (err) => {
  console.error(err);
  server.close();
});

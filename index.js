import * as http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  const message = "Hello client " + ip;

  res.end(message);
});

server.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

server.on("error", (err) => {
  console.error(err);
  server.close();
});

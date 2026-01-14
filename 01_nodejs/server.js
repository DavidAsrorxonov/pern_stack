import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("You just built a server");
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

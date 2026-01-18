const http = require("http");
const url = require("url");

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === "/health") {
    return sendJson(res, 200, { ok: true, service: "predator-api", ts: new Date().toISOString() });
  }

  if (pathname === "/api/status") {
    return sendJson(res, 200, {
      app: "Predator",
      stage: "MVP",
      deployed: true,
      message: "Backend online",
    });
  }

  return sendJson(res, 404, { ok: false, error: "Not Found", path: pathname });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

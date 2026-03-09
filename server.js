import http from "node:http";
import handler from "serve-handler";

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: "dist",
    cleanUrls: true,
    rewrites: [{ source: "**", destination: "/index.html" }]
  });
});

server.listen(PORT, HOST, () => {
  console.log(`MENTORIX site running on http://${HOST}:${PORT}`);
});
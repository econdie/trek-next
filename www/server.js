const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/reset/:code", (req, res) => {
    return app.render(req, res, "/reset/confirmation", {
      code: req.params.code
    });
  });

  server.get("/confirm/:code", (req, res) => {
    return app.render(req, res, "/signup/confirmation", {
      code: req.params.code
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

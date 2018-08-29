const express = require("express");
const http = require('http');
const path = require("path");
const fs = require("fs");
const { Listener } = require("./helper");
const WebSocket = require("ws");
// envs...
const isDev = process.env.NODE_ENV !== "production";
const PORT = isDev ? 8888 : 80;

// gonna need the httpServer in the ws codes...
const app = express();
const httpServer = http.createServer(app)

app.use(express.static(path.join(__dirname, "./static")));

if (isDev) {
  const watchListener = new Listener("watchFiles");

  const wss = new WebSocket.Server({ server: httpServer });
  wss.on("connection", ws => {
    console.log("connection!");
    ws.on("message", message => {
      console.log("received: %s", message);
    });
    watchListener.addEventListener((type, filename) =>
      ws.send("file changed")
    );
    ws.on('close', () => watchListener.removeAllListeners());
  });
  // WebSocket server

  fs.watch(
    path.join(__dirname, "./static"),
    { recursive: true },
    (event, filename) => {
      watchListener.trigger(event, filename);
    }
  );
}

httpServer.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

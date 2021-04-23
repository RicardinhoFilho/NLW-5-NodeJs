import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import { routes } from "./routes";

import "./database/index";

const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
const http = createServer(app); //Criando protocolo de http
const io = new Server(http); //Criando protocolo de webSocket



app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.json());
app.use(routes);

io.on("connection", (socket: Socket) => {
  //console.log("Se conectou", socket.id);
});
app.get("/", (req, res) => {
  return res.render("html/client.html");
});

export { http, io };

import { Router, Request, Response } from "express";
import { MessagesController } from "./controllers/MessagesController";
import {SettingController} from "./controllers/SettingController"
import { UserController } from "./controllers/UserController";
const settings = new SettingController();
const user = new UserController();
const message = new MessagesController();
const routes = Router();

routes.post("/settings", settings.create)
routes.get("/settings/:username", settings.finByUserName)
routes.put("/settings/:username", settings.update)

routes.post("/users", user.create)


routes.post("/messages", message.create)
routes.get("/messages/:id", message.showByUser)


export {routes};
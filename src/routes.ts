import { Router, Request, Response } from "express";
import {SettingController} from "./controllers/SettingController"

const settings = new SettingController();
const routes = Router();

routes.post("/settings", settings.create)



export {routes};
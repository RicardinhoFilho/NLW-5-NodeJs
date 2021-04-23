import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsService } from "../Services/SettingsService";

export class SettingController {
  async create(req: Request, res: Response) {
    try{
      const { chat, userName } = req.body;
  
      const settingsService = new SettingsService();
  
      const settings = await settingsService.create({chat, userName});
  
      return res.json(settings);
    }catch(error){
      res.status(400).json({message: error.message});
    }
   
  }

  async finByUserName(req: Request, res: Response){
    const {userName} = req.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUserName(userName);
  }


  async update(req: Request, res: Response) {
    try{
      const {  userName } = req.params;
      const {chat} = req.body;
  console.log(chat)
      const settingsService = new SettingsService();
  
      const settings = await settingsService.update(userName, chat);
  
      return res.json(await settingsService.findByUserName(userName));
    }catch(error){
      res.status(400).json({message: error.message});
    }
   
  }
}

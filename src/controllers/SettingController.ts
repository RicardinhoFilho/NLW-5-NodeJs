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
}

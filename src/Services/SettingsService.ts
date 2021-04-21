import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { ISettingsCreate } from "./ISettingsCreate";

export class SettingsService {
  async create({ chat, userName }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settingsRepository.findOne({
        userName
    });

    if(userAlreadyExists){
        throw new Error("User already exists!");
    }

    const settings = settingsRepository.create({
      chat,
      userName,
    });

    await settingsRepository.save(settings);

    return settings;
  }
}

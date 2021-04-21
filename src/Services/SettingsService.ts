import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { ISettingsCreate } from "../Utils/ISettingsCreate";

export class SettingsService {

  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, userName }: ISettingsCreate) {

    const userAlreadyExists = await this.settingsRepository.findOne({
        userName
    });

    if(userAlreadyExists){
        throw new Error("User already exists!");
    }

    const settings = this.settingsRepository.create({
      chat,
      userName,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }
}


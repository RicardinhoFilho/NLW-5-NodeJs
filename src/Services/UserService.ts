import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {

  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async create(email) {
    

    const userExists = await this.usersRepository.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

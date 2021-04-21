import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { IMessageCreate } from "../Utils/IMessageCreate";

export class MessageService {

  private messagesRepository:Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
    

    const message = await this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id){

    const list = await this.messagesRepository.find({
      where:{user_id},
      relations:["user"]
    })

    return list;

  }
}

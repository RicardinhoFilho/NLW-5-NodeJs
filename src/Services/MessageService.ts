import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { IMessageCreate } from "../Utils/IMessageCreate";

export class MessageService {
  async create({ admin_id, text, user_id }: IMessageCreate) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = await messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await messagesRepository.save(message);

    return message;
  }
}

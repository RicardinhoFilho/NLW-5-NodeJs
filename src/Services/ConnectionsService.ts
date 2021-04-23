import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { IConnectionCreate } from "../Utils/IConnectionCreate";

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>;
  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connectionExist = await this.finByUserId(id);
    if (connectionExist) {
      return connectionExist;
    } else {
      const connection = this.connectionsRepository.create({
        socket_id,
        user_id,
        admin_id,
        id,
      });

      await this.connectionsRepository.save(connection);

      return connection;
    }
  }

  async finByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }

  //   async update(connection:Connection) {
  //     const connection = await this.connectionsRepository.update(connection, s)

  //     await this.connectionsRepository.save(connection);

  //     return connection;
  //}
}

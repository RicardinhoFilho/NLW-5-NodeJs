import { io } from "../http";
import { ConnectionsService } from "../Services/ConnectionsService";
import { UserService } from "../Services/UserService";
import {MessageService} from "../Services/MessageService";
import { IParams } from "../Utils/IParams";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UserService();
  const messageService =  new MessageService();
  socket.on("client_first_access", async (params:IParams) => {
    const socket_id = socket.id;
    //console.log(params);
    const { text, email } = params;
    

    const user = await usersService.create(email); //Método create já faz a checagem se nosso usuário ja está cadastrado em nosso BD, caso esteja esta função nos retorna o próprio usuário

    const userId:string = user.id;

    const connection = await connectionsService.finByUserId(user.id);
    if (!connection) {
      await connectionsService.create({ socket_id, user_id: user.id });
      
    }else{
        
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
    }

    await messageService.create({
        text,
        user_id:userId
    })
  });
});

import {io} from "../http";
import {ConnectionsService} from "../Services/ConnectionsService";
import{UserService} from "../Services/UserService";

io.on("connect", (socket)=>{
    const connectionsService = new ConnectionsService();
    const usersService = new UserService();
    socket.on("client_first_access", async(params)=>{
        const socket_id = socket.id;
        //console.log(params);
        const {text, email} = params;

       const user = await usersService.create(email);//Método create já faz a checagem se nosso usuário ja está cadastrado em nosso BD, caso esteja esta função nos retorna o próprio usuário

        await connectionsService.create({socket_id, user_id:user.id})
    });

    //Salvar Conexão com scket_id, user_id
});

import express, { Response, Request } from "express";

const app = express();


/*  GET= Buscas
    POST = Criação
    PUT = Alteração
    DELETED = Deletar
    PATCH = Alterar informação expecífica
*/
app.get("/", (req:Request, res:Response)=>{
    const msg = "Olá NLW 05";
    return res.json({msg})
})

app.post("/", (req:Request, res:Response)=>{
    const msg = "Rota Post";
    return res.json({msg})
})

app.listen(3333,()=>console.log("Server is running on port 3333"))


import { MessageService } from "../Services/MessageService";
import { Request, Response } from "express";

export class MessagesController {

  
  async create(req: Request, res: Response) {
    try {
      const {admin_id, text, user_id} = req.body;

    const messageService = new MessageService();

   
 

    const message = await messageService.create({
      admin_id,
      text,
      user_id,
    });

    return res.json(message);
    } catch (error) {
      res.send(error.message)
    }
    
  }
}

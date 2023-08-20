import { Request, Response, NextFunction } from 'express';
import ClientsService from '../services/clients.service';
import Clients from '../../database/models/Clients';
import ErrorHandler from '../ErrorHandler/handlerError';
import IClient from '../interfaces/IClient';

export default class ClientController {
  constructor(private _clientService = new ClientsService()) {}

  public getAllClients = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const clients: Clients[] = await this._clientService.getClients();
      if (clients.length === 0 ) {
        throw new ErrorHandler(404, 'Nenhum cliente foi achado.');
      }
      return res.status(200).json(clients);
    } catch (err) {
      next(err)
    }
  };

  public createClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
     const newClient: IClient = req.body;
     await this._clientService.createClient(newClient);
     return res.status(201).send();
    } catch (err) {
      next(err)
    }
  };
}

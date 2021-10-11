import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import postModel from '../hobby/hobby.model';
import userModel from './user.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from './user.dto';
import UpdateUserDto from './update.dto';
import HttpException from '../exceptions/HttpException';
import UserService from './user.service';

class UserController implements Controller {
  public path = '/api/v1/users';
  public router = Router();
  private post = postModel;
  private user = userModel;
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getUsers);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.createUser);
    this.router.delete(`${this.path}/:id`, this.deleteUserById);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserDto), this.modifyUserById);
  }

  private getUsers = async (request: Request, response: Response) => {
    const users = await this.user.find().populate('hobbies');
    response.send(users);
  }

  private createUser = async (request: Request, response: Response) => {
    const userData: CreateUserDto = request.body;
    const res = await this.userService.insertNewUser(userData);
    response.status(201).send(res);
  }

  private modifyUserById = async (request: Request, response: Response) => {
    const id = request.params.id.toString();
    const userData: CreateUserDto = request.body;
    const res = await this.user.findByIdAndUpdate(id, userData);
    if (!res) {
      throw (new HttpException(404, 'user not found.'));
    }
    response.send(res);
  }

  private deleteUserById = async (request: Request, response: Response) => {
    const id = request.params.id;
    const res = await this.user.findByIdAndDelete(id);
    if (!res) {
      throw (new HttpException(404, 'user not found.'));
    }
    response.send(res);

  }
}

export default UserController;

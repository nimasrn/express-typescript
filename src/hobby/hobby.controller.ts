import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateHobbyDto from './hobby.dto';
import Post from './hobby.interface';
import hobbyModel from './hobby.model';
import UserService from '../user/user.service';

class PostController implements Controller {
  public path = '/api/v1/users';
  public router = Router();
  private hobby = hobbyModel;
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/hobbies`, this.getAllHobbies);
    this.router.get(`${this.path}/:user/hobbies`, this.getUserHobby);
    this.router.post(`${this.path}/:user/hobbies`, validationMiddleware(CreateHobbyDto), this.createUserHobby);
    this.router.delete(`${this.path}/:user/hobbies/:id`, this.deleteUserHobbyById);
  }

  private getAllHobbies = async (request: Request, response: Response) => {
    const hobbies = await this.hobby.find();
    response.send(hobbies);
  }

  private createUserHobby = async (request: Request, response: Response) => {
    const userId = request.params.user;
    const data: CreateHobbyDto = request.body;
    const newHobby = new this.hobby(data);
    const promises = [
      newHobby.save(),
      this.userService.addUserHobby(userId, newHobby._id),
    ];
    const res = await Promise.allSettled(promises);
    if (res[0].status === 'rejected' && res[1].status === 'fulfilled') {
      await this.userService.removeUserHobby(userId, newHobby._id);
      throw (new HttpException(500, res[0].reason));
    } else if (res[1].status === 'rejected' && res[0].status === 'fulfilled') {
      await this.hobby.findByIdAndDelete(newHobby._id);
      throw (new HttpException(500, res[1].reason));
    } else if (res[1].status === 'rejected' && res[0].status === 'rejected') {
      throw (new HttpException(500, res[0].reason));
    }
    response.status(201).send();

  }

  private getUserHobby = async (request: Request, response: Response) => {
    const userId = request.params.user;
    const res = await this.userService.getUserHobbies(userId);
    response.send(res);
  }

  private deleteUserHobbyById = async (request: Request, response: Response) => {
    const id = request.params.id;
    const user = request.params.user;
    const res = await this.userService.removeUserHobby(user, id);
    if (res) {
      response.sendStatus(200);
    } else {
      throw (new HttpException(404, 'not found.'));
    }
  }
}

export default PostController;

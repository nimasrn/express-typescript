import CreateUserDto from '../user.dto';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import App from '../../app';
import UserController from '../user.controller';

describe('The UserController', () => {
  describe('creating a user', () => {
    describe('if user name not provided', () => {
      it('should throw an error', async () => {
        const userData: CreateUserDto = {
          name: '',
        };
        const userController = new UserController();
        userController.userService.user.create = jest.fn().mockReturnValue({
          ...userData,
          _id: 0,
        });
        (mongoose as any).connect = jest.fn();
        const app = new App([
          userController,
        ]);
        const res = await request(app.getServer())
          .post(`${userController.path}`)
          .send(userData);
        expect(res.status).toBe(400);
      });
    });
    describe('if user name provided', () => {
      it('should return created', async () => {
        const userData: CreateUserDto = {
          name: 'nima',
        };
        const userController = new UserController();
        userController.userService.user.create = jest.fn().mockReturnValue({
          ...userData,
          _id: 0,
        });
        (mongoose as any).connect = jest.fn();
        const app = new App([
          userController,
        ]);
        const res = await request(app.getServer())
          .post(`${userController.path}`)
          .send(userData);
        expect(res.status).toBe(201);
      });
    });
  });
});

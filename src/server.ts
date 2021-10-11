import App from './app';
import HobbyController from './hobby/hobby.controller';
import UserController from './user/user.controller';

const app = new App(
  [
    new HobbyController(),
    new UserController(),
  ],
);

app.listen();

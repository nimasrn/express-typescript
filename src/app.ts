import * as express from 'express';
import * as config from 'config';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import Database from './database/db';
import * as winston from 'winston';
import logger from './logger/logging';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeLogger();
    this.initializeSwagger();
    this.initializeMiddlewares();
    this.connectDatabase();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT || config.get('port'), () => {
      winston.info(`App listening on the port ${process.env.PORT || config.get('port')}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  
  private initializeMiddlewares() {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(morgan('dev'));
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);

  }

  private initializeLogger() {
    logger();
  }

  private initializeControllers(controllers: Controller[]) {
    for (const iterator of controllers) {
      this.app.use('/', iterator.router);
    }
  }

  private connectDatabase() {
    const db = new Database(config.get('db'));
    db.connect();
  }
}

export default App;

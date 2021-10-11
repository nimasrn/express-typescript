import * as mongoose from 'mongoose';
import * as winston from 'winston';

class Database {
  public url: string;

  constructor(databaseUrl: string) {
    this.url = databaseUrl;
  }

  public connect() {
    winston.info('connect to database..');
    mongoose.connect(this.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

}

export default Database;

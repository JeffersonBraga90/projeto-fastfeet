import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/Users';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';

import databaseConfig from '../config/database';

const models = [User, File, Appointment, Deliveryman, Delivery];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

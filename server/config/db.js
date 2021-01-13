/* eslint-disable no-console */
import mongoose from 'mongoose';

const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = dbUrl => {
  mongoose.connect(dbUrl, mongooseConfig);
  const db = mongoose.connection;
  db.once('open', () =>
    console.log(`Database is connected to ${db.host}:${db.port}/${db.name}`),
  );
  db.on('close', () => console.error('Database is disconnected'));
};

export default connectDB;

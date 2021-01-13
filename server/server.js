import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDB from './config/db.js';
import config from './config/env.config.js';

import authRoute from './routes/auth.route.js';

const { PORT } = config;

const app = express();

connectDB(config.MONGO_URL);

//  use Cors if it still in developmental stage
if (config.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: config.CLIENT_URL,
    }),
  );
}

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// app router
app.use('/auth', authRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not Found',
  });
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

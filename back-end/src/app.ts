import express from 'express';
import cors from 'cors';
import * as middlewares from './middlewares';
import avionController from './controller/avionController';
import epiTypeController from './controller/epiTypeController';




//********** Server **********//
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5500', 'http://localhost:4200', 'http://127.0.0.1:3000'];


const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
// Initializing express.
const app = express();
// Enable CORS
app.use(cors(options));
// Middleware to parse json throught requests.

app.use(express.json());

app.use('/avions', avionController);
app.use('/epi-types', epiTypeController);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;

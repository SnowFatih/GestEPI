import express from 'express';
import cors from 'cors';
import * as middlewares from './middlewares';
import avionController from './controller/avionController';
import mecanicienController from './controller/mecanicienController';
import entretienController from './controller/entretienController';




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
app.use('/mecaniciens', mecanicienController);
app.use('/entretiens', entretienController);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;

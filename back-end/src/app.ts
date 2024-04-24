import express from 'express';
import cors from 'cors';
import * as middlewares from './middlewares';
import epiTypeController from './controller/epiTypeController';
import epiCheckController from './controller/epiCheckController';
import userController from './controller/userController';
import epiListController from './controller/epiListController';
import exportCSVJsonController from './controller/exportCSVJsonController';




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

app.use('/types', epiTypeController);
app.use('/checks', epiCheckController);
app.use('/users', userController);
app.use('/epi', epiListController);

app.use('/export', exportCSVJsonController);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;



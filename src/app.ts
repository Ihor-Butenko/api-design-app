import express from 'express';
import router from './router';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { protection } from './modules/auth';
import { createNewuser, signIn } from './handlers/user';

const app = express();

app.get('/', (req, res) => {
    res.statusCode = 200
    res.json({
        message: 'Hello World!'
    });
})

app.use(express.json())

app.use('/api', protection, router);

app.post('/signup', createNewuser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
    if(err.type === 'auth') res.statusCode(401).json({message : 'Unathorized'})
    if(err.type === 'input') res.statusCode(400).json({message : 'Bad request'})
})

export default app;
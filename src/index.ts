import app from './app';
import * as dotenv from 'dotenv';
import config from './config';

dotenv.config();

app.listen(config.port, () => {
    console.log('Server running on port 3000');
});
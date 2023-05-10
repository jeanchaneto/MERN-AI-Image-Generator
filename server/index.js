import  express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectToDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import imageGenRoutes from "./routes/imageGenRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

//Create API endpoints that frontend can connect to
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/imagegenerator', imageGenRoutes);

app.get('/', async (req, res) => {
    res.send('Image gen Ok')
})

app.get('/', async(req, res) => {
    res.send('Hello folks!')
})

const startServer = async () => {

    try {
        connectToDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server active on http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }

    
}

startServer();
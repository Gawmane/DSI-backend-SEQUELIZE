import express from 'express';
import { router as UserRouter } from './Routes/user.router.js';
import { router as SongRouter } from './Routes/song.router.js';
import { router as ArtistRouter } from './Routes/artist.router.js';
import { router as InitRouter } from './Routes/init.router.js';
import dotenv from 'dotenv';

//Kalder en environment vars
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.urlencoded({
    extended: true
}));


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})




app.use(InitRouter);
app.use(SongRouter);
app.use(ArtistRouter);
app.use(UserRouter);



app.listen(port, () => {
    console.log(`Server køre på port http://localhost:${port}`);
})
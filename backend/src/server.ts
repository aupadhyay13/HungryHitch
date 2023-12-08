import express from 'express';
import { dbConnect } from './configs/database.config';
import cors from "cors";
import path from 'path';
import bodyParser from "body-parser";
import { UserRoute } from './v1/modules/user/userRoute';
import { Routes } from './routes';
import * as dotenv from 'dotenv';
dbConnect();
dotenv.config();
const app = express();
const port = 3000;
const routes = new Routes();

app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200","http://localhost:4300"]
}));

app.use("/api/v1", routes.path());

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'))
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
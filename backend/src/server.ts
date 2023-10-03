import express from 'express';
import { dbConnect } from './configs/database.config';
import cors from "cors";
import { UserRoute } from './v1/modules/user/userRoute';
import { Routes } from './routes';
dbConnect();
const app = express();
const port = 3000;
const routes = new Routes();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
app.use("/api/v1", routes.path());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
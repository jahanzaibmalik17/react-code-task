import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import routes from './routes/index';
const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI as string , { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log("Database-connected"); })
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/', (routes));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Running on port ", PORT);
});

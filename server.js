import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

//App Config
const app = express();
const port = process.env.PORT || 8005;
const connection_url = `mongodb+srv://admin:dEOeVQTHa4MMAez1@cluster0.xhnsa.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(Cors({origin:true}));
app.options('*', Cors());
// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Api Endpoints
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/tinder/cards", async (request, response) => {
  try {
    const dbCard = request.body;
    await Cards.create(dbCard, (error, data) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send(data);
      }
    });
  } catch {
    (err) => console.log(err);
  }
});
app.get("/tinder/cards", async (request, response) => {
  try {
    await Cards.find((error, data) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));

// * Vital imports
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// * Import the router
import router from "./routes/customer.route";

const app: Express = express();

// * Constants
const PORT: number | string = process.env.PORT || 3000;
const uri: string = "mongodb+srv://bobbrysonn:freelancer.com@cluster-one.dkbnl.mongodb.net/customers?retryWrites=true&w=majority";
const devUri: string =
  "mongodb://localhost:27017/customers";

// * Middleware *//
app.use(cors());
app.use(bodyParser.json());
app.use(router);

// * Error 404
app.use((req, res, next) => {
  res.status(404).send("We think that you are lost!");
});

// * Connect to the db
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);
mongoose
  .connect(uri, options)
  .then((value) => { app.listen(PORT, () => global.console.log(`Server running on port:${PORT}`)) })
  .catch((reason: any) => console.error("Error;", reason));
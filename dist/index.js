"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// * Vital imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// * Import the router
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const app = express_1.default();
// * Constants
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://bobbrysonn:freelancer.com@cluster-one.dkbnl.mongodb.net/customers?retryWrites=true&w=majority";
const devUri = "mongodb://localhost:27017/customers";
// * Middleware *//
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(customer_route_1.default);
// * Error 404
app.use((req, res, next) => {
    res.status(404).send("We think that you are lost!");
});
// * Connect to the db
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default
    .connect(uri, options)
    .then((value) => { app.listen(PORT, () => global.console.log(`Server running on port:${PORT}`)); })
    .catch((reason) => console.error("Error;", reason));

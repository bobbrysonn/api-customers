"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomers = void 0;
const customer_model_1 = __importDefault(require("./../models/customer.model"));
// * Get list of customers
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    // * Retrieve the list of customers
    const customers = yield customer_model_1.default.find()
        .then((value) => value)
        .catch((reason) => {
        errors.push(new Error(reason));
        res.status(500).send("Error retrieving list");
    });
    if (errors.length === 0) {
        res.status(200).json({ message: "Customer list retrieved successfully!", customers });
    }
    ;
});
exports.getCustomers = getCustomers;
// * Create a new customer
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).send("Bad Request! Body missing");
    }
    const body = req.body;
    const customer = new customer_model_1.default({
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        cardNumber: body.cardNumber,
    });
    const errors = [];
    // * Save the customer and get the full list
    const newCustomer = yield customer.save().then((value) => value, (reason) => {
        res.status(500).send("Error; Duplicated entries possibly or missing entries: fname, lname, email, cardNumber");
        errors.push(new Error(reason));
    });
    const customers = yield customer_model_1.default.find()
        .then((value) => value, (reason) => {
        res.status(500).send("Error: Failed to retrieve list of documents");
        errors.push(new Error(reason));
    });
    if (errors.length === 0) {
        if (errors.length > 1)
            errors.forEach((value, index) => delete errors[index]);
        res.status(201).json({ message: "Customer added successfully!", newCustomer, customers });
    }
});
exports.createCustomer = createCustomer;
// * Updating a customer
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * Retrieve the customer cardNumber and boy from req
    const { params: { cardNumber }, body } = req;
    const cleanedBody = body;
    const filter = { cardNumber: Number.parseInt(cardNumber) };
    customer_model_1.default.findOne(filter)
        .then((value) => {
        if (value === null) {
            res.status(404).send("Error: Customer not found in the database!");
        }
        else {
            value.fname = cleanedBody.fname;
            value.lname = cleanedBody.lname;
            value.email = cleanedBody.email;
            value.cardNumber = cleanedBody.cardNumber;
            value.save()
                .then((value) => {
                res.status(201).json({ message: "Customer updated successfully", updatedCustomer: value });
            })
                .catch((reason) => {
                global.console.error(reason);
                res.status(500).send("Error during updating the customer");
            });
        }
    })
        .catch((reason) => {
        res.status(500).send("Error: during retrieving customer in the database");
    });
});
exports.updateCustomer = updateCustomer;
// * Delete a customer
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.body;
    const filter = { cardNumber: params.cardNumber };
    customer_model_1.default.findOneAndDelete(filter)
        .then((value) => {
        if (value === null) {
            res.status(404).send(`Error: The requested customer of card number: ${filter.cardNumber} was not found!`);
        }
        else {
            res.status(202).json({ message: "Customer deleted successfully", deletedCustomer: value });
        }
    })
        .catch((reason) => {
        res.status(500).send("Error during finding the customer");
    });
});
exports.deleteCustomer = deleteCustomer;

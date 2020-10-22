"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// * Necessary imports
const express_1 = require("express");
// * Importing the controllers
const customer_controller_1 = require("../controllers/customer.controller");
// * Init the router
const router = express_1.Router();
// * Set up the routes
router.get("/customers/", customer_controller_1.getCustomers);
router.post("/customers/", customer_controller_1.createCustomer);
router.put("/customers/:cardNumber", customer_controller_1.updateCustomer);
router.delete("/customers/:cardNumber", customer_controller_1.deleteCustomer);
exports.default = router;

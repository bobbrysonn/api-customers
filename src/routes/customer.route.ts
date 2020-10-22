// * Necessary imports
import { Router } from "express";
// * Importing the controllers
import {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    Index
} from "../controllers/customer.controller";

// * Init the router
const router: Router = Router();

// * Set up the routes
router.get("/", Index);
router.get("/customers", getCustomers);
router.post("/customers", createCustomer);
router.put("/customers/:cardNumber", updateCustomer);
router.delete("/customers/:cardNumber", deleteCustomer);


export default router;
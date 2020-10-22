import { Request, Response } from "express";
import { ICustomer } from "../types/customer.types";
import Customer from "./../models/customer.model";

const Index = (req: Request, res: Response) => {
  res.status(200).send(
  `Welcome to my API, You can make: 
  1. GET    - /customers
  2. POST   - /customers -- with a json body with keys: fname, lname, email, cardNumber
  3. PUT    - /customers/:cardNumber -- with a json body to update customer
  4. DELETE - /customers/:cardNumber -- to delete customer with cardNumber
  `);
}
// * Get list of customers
const getCustomers = async (req: Request, res: Response): Promise<void> => {
  const errors: Error[] = [];
  // * Retrieve the list of customers
  const customers: ICustomer[] | void = await Customer.find()
    .then((value: ICustomer[]) => value)
    .catch((reason: any) => {
      errors.push(new Error(reason));
      res.status(500).send("Error retrieving list");
    });

  if (errors.length === 0) {
    res.status(200).json({ message: "Customer list retrieved successfully!", customers });
  };
}
// * Create a new customer
const createCustomer = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send("Bad Request! Body missing");
  }

  const body = req.body as Pick<ICustomer, "fname" | "lname" | "email" | "cardNumber">
  const customer: ICustomer = new Customer({
    fname: body.fname,
    lname: body.lname,
    email: body.email,
    cardNumber: body.cardNumber,
  });

  const errors: Error[] = [];
  // * Save the customer and get the full list
  const newCustomer = await customer.save().then((value: ICustomer) => value,
    (reason: any) => {
      res.status(500).send("Error; Duplicated entries possibly or missing entries: fname, lname, email, cardNumber");
      errors.push(new Error(reason));
    });
  const customers: ICustomer[] | void = await Customer.find()
    .then((value: ICustomer[]) => value, (reason: any) => {
      res.status(500).send("Error: Failed to retrieve list of documents");
      errors.push(new Error(reason));
    });

  if (errors.length === 0) {
    if (errors.length > 1) errors.forEach((value, index) => delete errors[index]);
    res.status(201).json({ message: "Customer added successfully!", newCustomer, customers });
  }
};
// * Updating a customer
const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  // * Retrieve the customer cardNumber and boy from req
  const { params: { cardNumber }, body } = req;
  const cleanedBody = body as ICustomer;
  const filter = { cardNumber: Number.parseInt(cardNumber) };

  Customer.findOne(filter)
    .then((value: ICustomer | null) => {
      if (value === null) {
        res.status(404).send("Error: Customer not found in the database!");
      } else {
        value.fname = cleanedBody.fname;
        value.lname = cleanedBody.lname;
        value.email = cleanedBody.email;
        value.cardNumber = cleanedBody.cardNumber;

        value.save()
          .then((value: ICustomer) => {
            res.status(201).json({ message: "Customer updated successfully", updatedCustomer: value });
          })
          .catch((reason: any) => {
            global.console.error(reason);
            res.status(500).send("Error during updating the customer");
          });
      }
    })
    .catch((reason: any) => {
      res.status(500).send("Error: during retrieving customer in the database")
    });
};
// * Delete a customer
const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  //* Pick the filter -- cardNumber from req.params
  let filter: Pick<ICustomer, "cardNumber"> = { cardNumber: Number.parseInt(req.params.cardNumber) }
  
  Customer.findOneAndDelete(filter)
    .then((value: ICustomer | null) => {
      if (value === null) {
        res.status(404).send(`Error: The requested customer of card number: ${filter.cardNumber} was not found!`);
      } else {
        res.status(202).json({ message: "Customer deleted successfully", deletedCustomer: value });
      }
    })
    .catch((reason: any) => {
      res.status(500).send("Error during finding the customer");
    });

}

export { Index, getCustomers, createCustomer, updateCustomer, deleteCustomer };
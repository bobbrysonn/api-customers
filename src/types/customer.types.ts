import { Document } from "mongoose"

// * Must extend `Document`
interface ICustomer extends Document{
  fname: string;
  lname: string;
  email: string;
  cardNumber: number;
}

export { ICustomer }
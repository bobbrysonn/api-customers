import { ICustomer } from "../types/customer.types";
import { model, Schema } from "mongoose";

const customerSchema: Schema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    cardNumber: {
      type: Number,
      required: true,
      unique: true
    }
  },

  { timestamps: true }
);

export default model<ICustomer>("Customer", customerSchema);

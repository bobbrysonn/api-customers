"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.model("Customer", customerSchema);

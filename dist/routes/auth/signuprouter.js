"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupcontroller_1 = __importDefault(require("../../controllers/auth/signupcontroller"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    (0, signupcontroller_1.default)(username, email, password);
    res.status(200).json({ message: "Signup successful" });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@/controllers/user");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/user", user_1.createUser);
router.get("/users", user_1.getUsers);
router.get("/users/:id", user_1.getUserById);
exports.default = router;

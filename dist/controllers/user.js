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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.createUser = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, firstName, lastName, phone, dob, gender, image, } = req.body;
    try {
        const existingUserByEmail = yield db_1.db.user.findUnique({
            where: {
                email,
            },
        });
        const existingUserByUsername = yield db_1.db.user.findUnique({
            where: {
                username,
            },
        });
        const existingUserByPhone = yield db_1.db.user.findUnique({
            where: {
                phone,
            },
        });
        if (existingUserByEmail) {
            res.status(409).json({
                error: `Email already taken`,
                data: null,
            });
        }
        if (existingUserByUsername) {
            res.status(409).json({
                error: `username already taken`,
                data: null,
            });
        }
        if (existingUserByPhone) {
            res.status(409).json({
                error: "Phone already taken",
                data: null,
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield db_1.db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                dob,
                gender,
                image: image
                    ? image
                    : "https://utfs.io/f/c61ec63c-42b1-4939-a7fb-ed04d43e23ee-2558r.png",
            },
        });
        const { password: savedPassword } = newUser, others = __rest(newUser, ["password"]);
        res.status(201).json({
            data: others,
            error: null,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Internal Server Error",
            data: null,
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        const filteredUsers = users.map((user) => {
            const { password, role } = user, others = __rest(user, ["password", "role"]);
            return others;
        });
        res.status(200).json({
            data: filteredUsers,
            error: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong.",
            data: null,
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const users = yield db_1.db.user.findUnique({
            where: {
                id,
            },
        });
        if (!users) {
            return res.status(404).json({
                data: null,
                error: "User not found"
            });
        }
        const { password } = users, result = __rest(users, ["password"]);
        res.status(200).json({
            data: result,
            erorr: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.getUserById = getUserById;

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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
/**
 * Login user
 *
 * @param {Request<{}, {}, { username: string, password: string }>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ message: 'Missing username or password' });
        return;
    }
    const user = yield user_model_1.userModel.checkUserPass(username, password);
    if (!user) {
        res.status(500).json({ message: 'Invalid username or password' });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).json(user);
});
/**
 * Add user
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    const user = yield user_model_1.userModel.createUser({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({ message: 'User already exists' });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(201).json(user);
});
/**
 * logout user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const logout = (req, res) => {
    req.session = null;
    res.status(200).json({ message: 'Logged out' });
};
/**
 * Check auth
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.isLoggedIn) {
        const username = req.session.username;
        const user = yield user_model_1.userModel.findByUsername(username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
        return;
    }
    res.status(500).json({ message: "No authenticated" });
});
exports.default = {
    addUser,
    loginUser,
    logout,
    checkAuth,
};

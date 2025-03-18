"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routers_1 = __importDefault(require("./routes/post.routers"));
dotenv_1.default.config();
// Create express server
const app = (0, express_1.default)();
// Middleware
// To communicate with external frontend
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321', // Astro port (now only port 4321 can access to this server)
    credentials: true // allow cookies transfer between frontend and backend
}));
app.use(express_1.default.json());
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing cookie keys");
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 24 * 60 * 60 * 1000
}));
// Routes
app.use('/users', user_routes_1.default);
app.use('/posts', post_routers_1.default);
// 404 fallback
app.use((req, res) => {
    res.status(404).send("Page not found");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

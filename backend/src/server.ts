import cors from 'cors'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieSession from 'cookie-session';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routers';
dotenv.config()

// Create express server
const app = express()

// Middleware
// To communicate with external frontend
app.use(cors({
  origin: 'http://localhost:4321', // Astro port (now only port 4321 can access to this server)
  credentials: true // allow cookies transfer between frontend and backend
}))

app.use(express.json())

const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing cookie keys")
}
app.use(cookieSession({
  name: 'session',
  keys: [
    SIGN_KEY,
    ENCRYPT_KEY
  ],
  maxAge: 24 * 60 * 60 * 1000
}))

// Routes
app.use('/users', userRouter)
app.use('/posts', postRouter)

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Page not found")
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

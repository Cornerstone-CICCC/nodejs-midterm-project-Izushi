import { Request, Response } from "express"
import { userModel } from "../models/user.model"
import { User } from "../types/user"

/**
 * Login user
 * 
 * @param {Request<{}, {}, { username: string, password: string }>} req
 * @param {Response} res
 * @returns {void}
 */
const loginUser = async (req: Request<{}, {}, { username: string, password: string }>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(500).json({ message: 'Missing username or password' })
    return
  }
  const user = await userModel.checkUserPass(username, password)
  if (!user) {
    res.status(500).json({ message: 'Invalid username or password' })
    return
  }
  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(200).json(user)
}

/**
 * Add user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void}
 */
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password, firstname, lastname } = req.body
  const user = await userModel.createUser({ username, password, firstname, lastname })
  if (!user) {
    res.status(409).json({ message: 'User already exists' })
    return
  }
  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(201).json(user)
}

/**
 * logout user
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const logout = (req: Request, res: Response) => {
  req.session = null
  res.status(200).json({ message: 'Logged out' })
}

/**
 * Check auth
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
const checkAuth = async(req: Request, res: Response) => {
   if (req.session && req.session.isLoggedIn) {
    const username = req.session.username
    const user = await userModel.findByUsername(username)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json(user)
    return
  }
  res.status(500).json({ message: "No authenticated" })
}

export default {
  addUser,
  loginUser,
  logout,
  checkAuth,
}
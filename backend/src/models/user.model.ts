import { User } from "../types/user"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

class UserModel {
  private users: User[] = []

  findByUsername(username: string): User | null {
    const user = this.users.find(user => user.username === username)
    if (!user) return null
    return user
  }

  async checkUserPass(username: string, password: string): Promise<User | boolean> {
    const user = this.users.find(user => user.username === username)
    console.log({user})
    if (!user) return false
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return false
    return user
  }

  async createUser(newUser: Omit<User, 'id'>): Promise<User | boolean> {
    const { username, password, firstname, lastname } = newUser
    const foundIndex = this.users.findIndex(user => user.username === username)
    if (foundIndex !== -1) return false
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      firstname,
      lastname
    }
    this.users.push(user)
    return user
  }
}

export const userModel = new UserModel()
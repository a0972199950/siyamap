import db from '@/db'
import { CreateUserDto } from './dto'
import users from './user.schema'

class UserService {
  private users = users

  async insert(dto: CreateUserDto) {
    const { password, confirmPassword, ...userData } = dto

    const newUser = await db.insert(this.users).values(userData)
    return newUser
  }

  async findAll() {
    const users = await db.select().from(this.users)
    return users
  }
}

export default new UserService()

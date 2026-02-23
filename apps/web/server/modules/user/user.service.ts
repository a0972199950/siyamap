import db from '@/lib/db'
import { TInsertUserDto } from '@/types/dto'
import users from './user.schema'

class UserService {
  private users = users

  public async insert(dto: TInsertUserDto) {
    const { password, confirmPassword, ...userData } = dto

    const [newUser] = await db.insert(this.users).values(userData).returning()
    return newUser
  }

  public async findAll() {
    const users = await db.select().from(this.users)
    return users
  }
}

export default new UserService()

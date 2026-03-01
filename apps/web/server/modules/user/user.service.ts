import { eq } from 'drizzle-orm'

import db from '@/lib/db'
import { TInsertUserDto } from '@/types/dto'

import users from './user.schema'

class UserService {
  private users = users

  public async insert(
    dto: Omit<TInsertUserDto, 'password' | 'confirmPassword'>
  ) {
    const [newUser] = await db.insert(this.users).values(dto).returning()
    return newUser
  }

  public async findAll() {
    const users = await db.select().from(this.users)
    return users
  }

  public async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(this.users)
      .where(eq(this.users.email, email))
      .limit(1)

    return user
  }

  public async findOrInsert(
    userInfo: Omit<TInsertUserDto, 'password' | 'confirmPassword'>
  ) {
    const { email, username, picture } = userInfo

    let user = await this.findByEmail(email)

    if (!user) {
      user = await this.insert({
        email,
        username,
        picture,
      })
    }

    return user
  }
}

export default new UserService()

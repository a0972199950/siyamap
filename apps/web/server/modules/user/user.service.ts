import { and, eq, SQLWrapper } from 'drizzle-orm'

import db from '@/lib/db'
import { TInsertUserDto } from '@/types/dto'

import { User, users } from './user.schema'

class UserService {
  private users = users

  async insert(dto: Omit<TInsertUserDto, 'password' | 'confirmPassword'>) {
    const [newUser] = await db.insert(this.users).values(dto).returning()
    return newUser
  }

  async findAll() {
    const users = await db.select().from(this.users)
    return users
  }

  async findOne(query: Partial<User>) {
    const filters: SQLWrapper[] = []

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        filters.push(eq(this.users[key as keyof User], value))
      }
    })

    const [user] = await db
      .select()
      .from(this.users)
      .where(and(...filters))
      .limit(1)

    return user
  }

  async findOrInsert(
    userInfo: Omit<TInsertUserDto, 'password' | 'confirmPassword'>
  ) {
    const { email, username, picture } = userInfo

    let user = await this.findOne({ email })

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

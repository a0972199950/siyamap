import bcrypt from 'bcryptjs'
import { and, eq, SQLWrapper } from 'drizzle-orm'

import db from '@/lib/db'
import { TInsertUserDto } from '@/types/dto'

import { User, users } from './user.schema'

interface InsertUserProps extends Omit<
  TInsertUserDto,
  'confirmPassword' | 'password' | 'role'
> {
  password?: string
  rlole?: 'ADMIN' | 'USER'
}

class UserService {
  private users = users

  async insert(dto: InsertUserProps) {
    if (!dto.password) {
      const [newUser] = await db
        .insert(this.users)
        .values({ ...dto, password: null })
        .returning()
      return newUser
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(dto.password, saltRounds)

    const [newUser] = await db
      .insert(this.users)
      .values({ ...dto, password: hashedPassword })
      .returning()

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
    userInfo: Omit<TInsertUserDto, 'password' | 'confirmPassword' | 'role'>
  ) {
    const { email } = userInfo

    let user: any = await this.findOne({ email })

    if (!user) {
      user = await this.insert(userInfo)
    }

    return user
  }
}

export default new UserService()

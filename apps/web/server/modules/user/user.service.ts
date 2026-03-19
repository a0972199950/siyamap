import _bcrypt from 'bcryptjs'
import { and, eq, SQLWrapper } from 'drizzle-orm'

import _db from '@/lib/db'
import { User, users } from '@/server/schema'
import { TInsertUserDto } from '@/types/dto'

interface InsertUserProps extends Omit<
  TInsertUserDto,
  'confirmPassword' | 'password' | 'role'
> {
  password?: string
  rlole?: 'ADMIN' | 'USER'
}

export class UserService {
  constructor(
    private readonly db = _db,
    private readonly hashSync = _bcrypt.hashSync
  ) {}

  async insert(dto: InsertUserProps) {
    if (!dto.password) {
      const [newUser] = await this.db
        .insert(users)
        .values({ ...dto, password: null })
        .returning()
      return newUser
    }

    const saltRounds = 10
    const hashedPassword = this.hashSync(dto.password, saltRounds)

    const [newUser] = await this.db
      .insert(users)
      .values({ ...dto, password: hashedPassword })
      .returning()

    return newUser
  }

  async findAll() {
    const data = await this.db.select().from(users)
    return data
  }

  async findOne(query: Partial<User>) {
    const filters: SQLWrapper[] = []

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        filters.push(eq(users[key as keyof User], value))
      }
    })

    const [user] = await this.db
      .select()
      .from(users)
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

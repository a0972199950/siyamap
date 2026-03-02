import {
  TCreateFileDto,
  TCreateFileResDto,
  TGetLoginUrlDto,
  TGetLoginUrlResDto,
  TInsertUserDto,
  TUserDto,
} from '@/types/dto'
import { RequestClient } from '@/utils/request'

class Api extends RequestClient {
  constructor(baseURL?: string) {
    super(baseURL)
  }

  // users API
  getUsers = () => this.get<{ data: TUserDto[] }>('/users')

  insertUser = (dto: TInsertUserDto) =>
    this.post<{ data: TUserDto }>('/users', {
      body: dto,
    })

  // upload API
  createFile = (dto: TCreateFileDto) =>
    this.post<{ data: TCreateFileResDto }>('/files', {
      body: dto,
    })

  // oauth API
  generateGoogleLoginUrl = (dto: TGetLoginUrlDto) =>
    this.get<{ data: TGetLoginUrlResDto }>('/oauth/google/login-url', {
      params: dto,
      cache: 'no-store',
    })

  // profile API
  getProfile = () =>
    this.get<{ data: TUserDto }>('/profile', {
      cache: 'no-store',
    })
}

export default new Api()

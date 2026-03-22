import {
  TCreateFileDto,
  TCreateFileResDto,
  TGetLoginUrlDto,
  TGetLoginUrlResDto,
  TInsertUserDto,
  TInsertVenueDto,
  TLoginDto,
  TSignupDto,
  TUpdateVenueDto,
  TUserDto,
  TVenueDto,
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

  // auth API
  signup = (dto: TSignupDto) => this.post('/auth/signup', { body: dto })

  login = (dto: TLoginDto) => this.post('/auth/login', { body: dto })

  logout = () => this.get('/auth/logout')

  // venue API
  createVenue = (dto: TInsertVenueDto) =>
    this.post<{ data: TVenueDto }>('/venues', {
      body: dto,
    })

  getVenues = () => this.get<{ data: TVenueDto[] }>('/venues')

  getVenue = (id: string) =>
    this.get<{ data: TVenueDto }>(`/venues/${id}`, {
      cache: 'no-store',
    })

  updateVenue = (id: string, dto: TUpdateVenueDto) =>
    this.put<{ data: TVenueDto }>(`/venues/${id}`, {
      body: dto,
    })

  deleteVenue = (id: string) => this.delete<{ data: string }>(`/venues/${id}`)
}

export default new Api()

import { NextPage } from 'next'
import api from '@/lib/api-client'
import PageUserClient from './components/PageUserClient'

const PageUser: NextPage = async () => {
  const { data } = await api.getUsers()

  return <PageUserClient initialUsers={data} />
}

export default PageUser

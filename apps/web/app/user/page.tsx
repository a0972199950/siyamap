import { NextPage } from 'next'
import api from '@/lib/api-client'
import PageUserClient from './components/PageUserClient'

// NextJS 沒有辦法在 build 自己的時候調用自己的 GET /api/users。所以如果 server component 需要調用 API，只能退成 SSR，不能用 ISR
export const dynamic = 'force-dynamic'

const PageUser: NextPage = async () => {
  const { data } = await api.getUsers()

  return <PageUserClient initialUsers={data} />
}

export default PageUser

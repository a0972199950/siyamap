'use client'

import { NextPage } from 'next'
import React from 'react'

import api from '@/lib/api-client'
import logger from '@/utils/logger'

const DEFAULT_FROM_URL = '/'

const PageLogin: NextPage = () => {
  const [loginUrl, setLoginUrl] = React.useState<string | null>(null)
  const search = typeof window !== 'undefined' ? window.location.search : ''
  const from = new URLSearchParams(search).get('from') || DEFAULT_FROM_URL

  React.useEffect(() => {
    const fetchLoginUrl = async () => {
      const { data } = await api.generateGoogleLoginUrl({ from })
      setLoginUrl(data.loginUrl)
    }

    fetchLoginUrl()
  }, [from])

  logger.log('Google Login URL:', loginUrl)

  return (
    <div>
      <a href={loginUrl || '#'}>Login with Google</a>
    </div>
  )
}

export default PageLogin

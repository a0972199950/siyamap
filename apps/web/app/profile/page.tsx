'use client'

import { Button } from '@siyamap/ui'
import { NextPage } from 'next'

import { useProfileContext } from '@/contexts/profile-context'

const PageProfile: NextPage = () => {
  const { profile } = useProfileContext()

  return (
    <>
      <main>
        <h1>{profile?.username}</h1>
        <p>{profile?.email}</p>

        <img
          src={profile?.picture || 'https://via.placeholder.com/150'}
          loading="lazy"
          alt={profile?.username || 'User Avatar'}
        />
      </main>
    </>
  )
}

export default PageProfile

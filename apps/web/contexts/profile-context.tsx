'use client'

import React from 'react'

import { TUserDto } from '@/types/dto'

interface TProfileContext {
  profile: TUserDto | null
}

const ProfileContext = React.createContext<TProfileContext>({ profile: null })

interface Props {
  children: React.ReactNode
  profile: TUserDto | null
}

const ProfileContextProvider: React.FC<Props> = ({ children, profile }) => {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfileContext = () => React.useContext(ProfileContext)

export { ProfileContext, ProfileContextProvider, useProfileContext }

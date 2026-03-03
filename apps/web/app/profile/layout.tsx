import { ProfileContextProvider } from '@/contexts/profile-context'
import api from '@/lib/api-client'

export const dynamic = 'force-dynamic'

export interface Props {
  children: React.ReactNode
}

const ProfileLayout = async (props: Props) => {
  const { children } = props
  const profile = await api.getProfile()

  return (
    <ProfileContextProvider profile={profile.data}>
      {children}
    </ProfileContextProvider>
  )
}

export default ProfileLayout

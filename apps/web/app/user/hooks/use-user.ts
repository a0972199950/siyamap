import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from '@/lib/api-client'
import { TUserDto } from '@/types/dto'
import logger from '@/utils/logger'

const useUser = (initialUsers: TUserDto[]) => {
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data } = await api.getUsers()

        return data
      } catch (err) {
        logger.error('Failed to fetch users:', err)
        return []
      }
    },
    initialData: initialUsers,
  })

  const createUserMutation = useMutation({
    mutationFn: async (args: {
      username: string
      email: string
      password: string
      confirmPassword: string
      role: 'ADMIN' | 'USER'
    }) => {
      const { data } = await api.insertUser(args)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },

    onError: err => {
      logger.error('Error creating user:', err)
    },
  })

  return { users, isLoading, createUserMutation }
}

export default useUser

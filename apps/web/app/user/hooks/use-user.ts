import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api-client'

const useUser = () => {
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data } = await api.getUsers()

        return data
      } catch (err) {
        console.error('Failed to fetch users:', err)
        return []
      }
    },
  })

  const createUserMutation = useMutation({
    mutationFn: async (args: {
      username: string
      email: string
      password: string
      confirmPassword: string
    }) => {
      const { data } = await api.insertUser(args)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },

    onError: err => {
      console.error('Error creating user:', err)
    },
  })

  return { users, isLoading, createUserMutation }
}

export default useUser

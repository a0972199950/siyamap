import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/server/modules/user/user.schema'

const useUser = () => {
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        // TODO: 用 zod 驗證 response，並序列化
        // const UserSchema = z.object({
        //   createdAt: z.coerce.date(), // 這裡會自動處理 string -> Date
        // });
        const res = await fetch('/api/users')

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await res.json()
        console.log('Fetched users:', data)
        return data.data
      } catch (err) {
        console.error('Failed to fetch users:', err)
        return []
      }
    },
  })

  const createUserMutation = useMutation<
    User,
    Error,
    {
      username: string
      email: string
      password: string
      confirmPassword: string
    }
  >({
    mutationFn: async (args: {
      username: string
      email: string
      password: string
      confirmPassword: string
    }) => {
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args),
        })

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        return res.json()
      } catch (err) {
        console.error('Failed to create user:', err)
      }
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

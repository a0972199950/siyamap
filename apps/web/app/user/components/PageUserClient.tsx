'use client'

import React from 'react'
import dayjs from '@/lib/dayjs'
import { Button, Icon } from '@siyamap/ui'
import { faSpinner } from '@siyamap/ui'
import useUser from '../hooks/use-user'
import { TUserDto } from '@/types/dto'

interface Props {
  initialUsers: TUserDto[]
}

const PageUserClient = (props: Props): React.ReactElement => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const { users, isLoading, createUserMutation } = useUser(props.initialUsers)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserMutation.mutate({ username, email, password, confirmPassword })
  }

  return (
    <div className="p-8">
      <form
        className="mb-10 flex max-w-sm flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">使用者名稱</label>
        <input
          id="username"
          type="text"
          placeholder="使用者名稱"
          className="rounded border p-2 text-black"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="rounded border p-2 text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="rounded border p-2 text-black"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="rounded border p-2 text-black"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <Button type="primary">新增使用者</Button>
      </form>

      {isLoading && (
        <p>
          <Icon icon={faSpinner} animation="spin" /> Loading...
        </p>
      )}

      {users?.length &&
        users.map(user => {
          return (
            <li key={user.id}>
              {user.username} ({user.email}) - 建立於:{' '}
              {dayjs(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </li>
          )
        })}
    </div>
  )
}

export default PageUserClient

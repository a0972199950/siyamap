'use client'

import PageError from '@/components/PageError'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const RootError = (props: Props) => {
  return <PageError {...props} />
}

export default RootError

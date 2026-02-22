import { Icon, faSpinner } from '@siyamap/ui'

const LoadingUser = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <Icon icon={faSpinner} animation="spin" />
    </div>
  )
}

export default LoadingUser

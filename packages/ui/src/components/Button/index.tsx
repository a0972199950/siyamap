import clsx from 'clsx'
import React from 'react'

import { UiColors } from '../../types/common'
import Icon from '../Icon'

import styles from './index.module.css'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'secondary'
  color?: UiColors
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ComponentProps<typeof Icon>['icon']
  className?: string
  children: React.ReactNode
}

const Button = (props: Props): React.ReactElement => {
  const {
    type = 'primary',
    color,
    rounded = 'full',
    size = 'sm',
    icon,
    className,
    children,
    ...rest
  } = props

  const classes = clsx(
    styles['button'],
    styles[`button--${type}`],
    styles[`button--rounded-${rounded}`],
    styles[`button--size-${size}`],
    className
  )

  return (
    <button
      className={classes}
      style={
        {
          '--btn-custom-bg-color': `var(--color-ui-${color})`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {icon && <Icon icon={icon} size={size} />}
      {children}
    </button>
  )
}

export default Button

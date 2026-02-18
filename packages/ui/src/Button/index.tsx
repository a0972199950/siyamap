import React from "react"
import clsx from 'clsx';
import styles from "./index.module.css"
import { UiColors } from "../types/common"

interface Props {
  type?: 'primary' | 'secondary'
  color?: UiColors
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const Button = (props: Props): JSX.Element => {
  const { type = 'primary', color, rounded, size, className, children } = props

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
      style={{
        '--btn-custom-bg-color': `var(--color-ui-${color})`
      } as React.CSSProperties}
    >
      {children}
    </button>
  )
}

export default Button

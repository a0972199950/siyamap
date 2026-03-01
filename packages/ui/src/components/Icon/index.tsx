import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { AnimationProps,FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import React from 'react'

import { UiColors } from '../../types/common'

import styles from './index.module.css'

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * FontAwesome 圖標定義
   */
  icon: IconDefinition
  /**
   * 圖標大小
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * 圖標顏色
   */
  type?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'muted'
    | 'white'
  /**
   * UI 顏色（與專案色彩系統對應）
   */
  color?: UiColors
  /**
   * 動畫效果
   */
  animation?: keyof AnimationProps
  /**
   * 圖標翻轉
   */
  flip?: 'horizontal' | 'vertical' | 'both'
  /**
   * 圖標旋轉角度
   */
  rotation?: 90 | 180 | 270
  /**
   * 自訂樣式類別
   */
  className?: string
}

const Icon = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const {
    icon,
    size = 'md',
    type = 'default',
    color,
    animation,
    flip,
    rotation,
    className,
    ...rest
  } = props

  const classes = clsx(
    styles['icon'],
    styles[`icon--type-${type}`],
    styles[`icon--size-${size}`],
    className
  )

  return (
    <span
      ref={ref}
      className={classes}
      style={
        {
          '--icon-custom-color': `var(--color-ui-${color})`,
        } as React.CSSProperties
      }
      {...rest}
    >
      <FontAwesomeIcon
        icon={icon}
        flip={flip}
        rotation={rotation}
        {...(animation ? { [animation]: true } : {})}
      />
    </span>
  )
})

export default Icon

// FontAwesome 圖標和配置
export * from '../../utils/fontawesome'

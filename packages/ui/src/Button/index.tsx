import React from "react"
import styles from './index.module.scss'

const Button = ({ children }: { children: React.ReactNode }) => {
  return <button className={styles.test}>{children}</button>
}

export default Button

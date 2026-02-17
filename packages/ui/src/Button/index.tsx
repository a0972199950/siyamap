import React from "react"
import styles from "./index.module.css"

const Button = ({ children }: { children: React.ReactNode }) => {
  return <button className={styles.foo__bar}>{children}</button>
}

export default Button

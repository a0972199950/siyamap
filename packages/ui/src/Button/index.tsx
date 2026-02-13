import React from "react"

const Button = ({ children }: { children: React.ReactNode }) => {
  return <button style={{ padding: 12, background: "pink", color: "white" }}>{children}</button>
}

export default Button

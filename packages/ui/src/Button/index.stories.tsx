import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./index"

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "按鈕類型"
    },
    color: {
      control: { type: "select" },
      options: [
        "primary-500",
        "primary-400",
        "secondary-500",
        "secondary-400",
        "secondary-300",
        "red",
        "green",
        "blue"
      ],
      description: "按鈕顏色"
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "按鈕圓角"
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "按鈕大小"
    },
    className: {
      control: { type: "text" },
      description: "自定義 CSS 類名"
    },
    children: {
      control: { type: "text" },
      description: "按鈕內容"
    }
  }
}

export default meta

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "分享視野",
    type: "primary"
  },
}

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: "登入",
    type: "secondary"
  },
}

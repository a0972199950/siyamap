import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Icon from './index'

const meta = {
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '基於 FontAwesome 的圖標組件，支援多種大小、顏色和動畫效果。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'FontAwesome 圖標定義',
      control: false
    },
    size: {
      description: '圖標大小',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    type: {
      description: '圖標類型 (影響顏色和樣式)',
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'muted', 'white']
    },
    color: {
      description: 'UI 顏色（與專案色彩系統對應）',
      control: 'select',
      options: ['primary-500', 'primary-400', 'secondary-500', 'secondary-400', 'secondary-300', 'red', 'green', 'blue']
    },
    animation: {
      description: '動畫效果',
      control: 'select',
      options: [
        'spin',
        'spinPulse',
        'spinReverse',
        'pulse',
        'beat',
        'fade',
        'beatFade',
        'bounce',
        'shake'
      ]
    },
    flip: {
      description: '翻轉方向',
      control: 'select',
      options: [undefined, 'horizontal', 'vertical', 'both']
    },
    rotation: {
      description: '旋轉角度',
      control: 'select',
      options: [undefined, 90, 180, 270]
    },
  }
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    icon: faHome,
  }
}

export const Spin: Story = {
  args: {
    icon: faSpinner,
    animation: 'spin'
  }
}

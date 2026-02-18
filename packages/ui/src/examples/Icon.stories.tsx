import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '完整的 Icon 組件使用範例，展示各種大小、顏色、動畫和變形效果的使用方式。'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

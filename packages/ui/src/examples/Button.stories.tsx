import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '完整的 Button 組件使用範例，展示各種類型、大小、顏色和圓角設定的使用方式。'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

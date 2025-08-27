import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    clearable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text input
export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
    label: 'Text Input',
  },
};

// Password input with visibility toggle
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
    label: 'Password',
    helperText: 'Password must be at least 8 characters',
  },
};

// Clearable input
export const Clearable: Story = {
  args: {
    placeholder: 'Type something to see clear button...',
    label: 'Clearable Input',
    clearable: true,
    defaultValue: 'Clear me!',
  },
};

// Password with clearable
export const PasswordClearable: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password with Clear',
    clearable: true,
    defaultValue: 'password123',
  },
};

// Error state
export const WithError: Story = {
  args: {
    placeholder: 'Enter valid email...',
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input size="small" placeholder="Small input..." label="Small" />
      <Input size="medium" placeholder="Medium input..." label="Medium" />
      <Input size="large" placeholder="Large input..." label="Large" />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        variant="outlined"
        placeholder="Outlined variant..."
        label="Outlined"
      />
      <Input variant="filled" placeholder="Filled variant..." label="Filled" />
    </div>
  ),
};

// Number input
export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '0',
    label: 'Number Input',
    min: 0,
    max: 100,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    label: 'Disabled Input',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    placeholder: 'Full width input...',
    label: 'Full Width',
    fullWidth: true,
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

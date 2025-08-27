import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastContainer } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic toast examples
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    isVisible: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    isVisible: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'This action cannot be undone.',
    isVisible: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'Your session will expire in 5 minutes.',
    isVisible: true,
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    type: 'success',
    message: 'File uploaded successfully!',
    isVisible: true,
  },
};

// Different durations
export const LongDuration: Story = {
  args: {
    type: 'info',
    title: 'Long Duration',
    message: 'This toast will stay for 10 seconds.',
    duration: 10000,
    isVisible: true,
  },
};

export const NoDuration: Story = {
  args: {
    type: 'warning',
    title: 'Manual Close Only',
    message: 'This toast will not auto-dismiss.',
    duration: 0,
    isVisible: true,
  },
};

// Different positions
export const Positions: Story = {
  args: {
    message: 'Toast positioning demo',
    isVisible: true,
    onClose: () => {},
  },
  render: () => {
    const [toasts, setToasts] = useState([
      {
        id: '1',
        type: 'success' as const,
        message: 'Top Right',
        position: 'top-right' as const,
      },
      {
        id: '2',
        type: 'error' as const,
        message: 'Top Left',
        position: 'top-left' as const,
      },
      {
        id: '3',
        type: 'warning' as const,
        message: 'Bottom Right',
        position: 'bottom-right' as const,
      },
      {
        id: '4',
        type: 'info' as const,
        message: 'Bottom Left',
        position: 'bottom-left' as const,
      },
    ]);

    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            isVisible={true}
            onClose={() =>
              setToasts(prev => prev.filter(t => t.id !== toast.id))
            }
          />
        ))}
      </div>
    );
  },
};

// Interactive demo with buttons
export const InteractiveDemo: Story = {
  args: {
    message: 'Interactive toast demo',
    isVisible: false,
    onClose: () => {},
  },
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        title?: string;
        message: string;
      }>
    >([]);

    const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: {
          title: 'Success!',
          message: 'Operation completed successfully.',
        },
        error: { title: 'Error', message: 'Something went wrong.' },
        warning: { title: 'Warning', message: 'Please review your input.' },
        info: { title: 'Info', message: 'Here is some information.' },
      };

      const newToast = {
        id: Date.now().toString(),
        type,
        ...messages[type],
      };

      setToasts(prev => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
      <div style={{ padding: '20px', height: '100vh' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => addToast('success')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Success Toast
          </button>
          <button
            onClick={() => addToast('error')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Error Toast
          </button>
          <button
            onClick={() => addToast('warning')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Warning Toast
          </button>
          <button
            onClick={() => addToast('info')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Info Toast
          </button>
        </div>

        <ToastContainer
          toasts={toasts}
          onRemoveToast={removeToast}
          position="bottom-right"
        />
      </div>
    );
  },
};

// Without close button
export const NoCloseButton: Story = {
  args: {
    type: 'info',
    title: 'Auto-dismiss only',
    message: 'This toast has no close button.',
    showCloseButton: false,
    isVisible: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Home,
  Settings,
  User,
  Mail,
  FileText,
  Folder,
  Star,
} from 'lucide-react';
import { SidebarMenu, MenuItem } from './SidebarMenu';

const meta = {
  title: 'Navigation/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    width: {
      control: { type: 'number', min: 200, max: 600, step: 20 },
    },
  },
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home size={18} />,
    href: '#home',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={18} />,
    href: '#profile',
    badge: 2,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <Mail size={18} />,
    href: '#messages',
    badge: 'New',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    href: '#settings',
  },
];

const nestedMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home size={18} />,
    href: '#dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder size={18} />,
    children: [
      {
        id: 'project-1',
        label: 'Website Redesign',
        href: '#project-1',
        badge: 3,
      },
      {
        id: 'project-2',
        label: 'Mobile App',
        href: '#project-2',
      },
      {
        id: 'project-3',
        label: 'API Development',
        href: '#project-3',
        badge: 'New',
      },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText size={18} />,
    children: [
      {
        id: 'reports',
        label: 'Reports',
        children: [
          {
            id: 'monthly-reports',
            label: 'Monthly Reports',
            href: '#monthly-reports',
          },
          {
            id: 'yearly-reports',
            label: 'Yearly Reports',
            href: '#yearly-reports',
          },
        ],
      },
      {
        id: 'contracts',
        label: 'Contracts',
        href: '#contracts',
        badge: 5,
      },
      {
        id: 'invoices',
        label: 'Invoices',
        href: '#invoices',
      },
    ],
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <Star size={18} />,
    href: '#favorites',
    badge: 12,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    children: [
      {
        id: 'account',
        label: 'Account Settings',
        href: '#account',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        href: '#notifications',
        badge: 1,
      },
      {
        id: 'privacy',
        label: 'Privacy & Security',
        href: '#privacy',
      },
    ],
  },
];

// Basic sidebar
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: basicMenuItems,
    title: 'Menu',
  },
};

// Nested menu items
export const WithNestedItems: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: nestedMenuItems,
    title: 'Navigation',
  },
};

// Left positioned
export const LeftPosition: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: basicMenuItems,
    title: 'Left Menu',
    position: 'left',
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: nestedMenuItems,
    title: 'Wide Menu',
    width: 400,
  },
};

// No overlay
export const NoOverlay: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: basicMenuItems,
    title: 'No Overlay',
    overlay: false,
  },
};

// No title
export const NoTitle: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Sidebar closed'),
    items: basicMenuItems,
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    items: [],
    title: 'Project Navigation',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (item: MenuItem) => {
      setSelectedItem(item.label);
      console.log('Clicked item:', item.label);
    };

    const menuItemsWithClick = nestedMenuItems.map(item => ({
      ...item,
      onClick: () => handleItemClick(item),
      children: item.children?.map(child => ({
        ...child,
        onClick: () => handleItemClick(child),
        children: child.children?.map(grandchild => ({
          ...grandchild,
          onClick: () => handleItemClick(grandchild),
        })),
      })),
    }));

    return (
      <div
        style={{ height: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Open Sidebar
          </button>
          {selectedItem && (
            <span style={{ color: '#666' }}>
              Last clicked: <strong>{selectedItem}</strong>
            </span>
          )}
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
        >
          <h2>Main Content Area</h2>
          <p>
            Click "Open Sidebar" to see the menu in action. The sidebar will
            slide in from the right.
          </p>
          <p>You can:</p>
          <ul>
            <li>Click items to navigate</li>
            <li>Expand/collapse menu sections</li>
            <li>Close by clicking the X button or clicking outside</li>
            <li>Use Escape key to close</li>
          </ul>
        </div>

        <SidebarMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={menuItemsWithClick}
          title="Project Navigation"
          width={320}
          position="right"
        />
      </div>
    );
  },
};

// States comparison
export const States: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    items: [],
  },
  render: () => {
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);

    return (
      <div
        style={{ height: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}
      >
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setLeftOpen(!leftOpen)}
            style={{
              padding: '8px 16px',
              backgroundColor: leftOpen ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {leftOpen ? 'Close' : 'Open'} Left Sidebar
          </button>
          <button
            onClick={() => setRightOpen(!rightOpen)}
            style={{
              padding: '8px 16px',
              backgroundColor: rightOpen ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {rightOpen ? 'Close' : 'Open'} Right Sidebar
          </button>
        </div>

        <div
          style={{
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2>Both Sidebars Demo</h2>
          <p>This demonstrates having sidebars on both sides simultaneously.</p>
        </div>

        <SidebarMenu
          isOpen={leftOpen}
          onClose={() => setLeftOpen(false)}
          items={basicMenuItems}
          title="Left Menu"
          position="left"
          width={280}
        />

        <SidebarMenu
          isOpen={rightOpen}
          onClose={() => setRightOpen(false)}
          items={nestedMenuItems}
          title="Right Menu"
          position="right"
          width={320}
        />
      </div>
    );
  },
};

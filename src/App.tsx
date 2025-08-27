import { useState } from 'react';
import { Home, Settings, User, Mail, FileText } from 'lucide-react';
import { Input, Toast, SidebarMenu, MenuItem } from './index';
import './App.css';

const menuItems: MenuItem[] = [
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
    children: [
      {
        id: 'personal-info',
        label: 'Personal Info',
        href: '#personal-info',
      },
      {
        id: 'account-settings',
        label: 'Account Settings',
        href: '#account-settings',
        badge: 1,
      },
    ],
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <Mail size={18} />,
    href: '#messages',
    badge: 3,
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText size={18} />,
    children: [
      {
        id: 'recent',
        label: 'Recent Files',
        href: '#recent',
      },
      {
        id: 'shared',
        label: 'Shared with me',
        href: '#shared',
        badge: 'New',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    href: '#settings',
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleShowToast = () => {
    setShowToast(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>React Component Library Demo</h1>
        <p>
          A showcase of reusable UI components built with React, TypeScript, and
          Storybook.
        </p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Input Component</h2>
          <div className="input-demo">
            <Input
              label="Text Input"
              placeholder="Enter some text..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              clearable
            />
            <Input
              type="password"
              label="Password Input"
              placeholder="Enter password..."
              helperText="Password with visibility toggle"
            />
            <Input
              type="email"
              label="Email with Error"
              placeholder="Enter email..."
              error="Please enter a valid email address"
              defaultValue="invalid-email"
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>Interactive Controls</h2>
          <div className="controls">
            <button
              className="demo-button primary"
              onClick={() => setSidebarOpen(true)}
            >
              Open Sidebar Menu
            </button>
            <button className="demo-button secondary" onClick={handleShowToast}>
              Show Success Toast
            </button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎛️ Smart Input</h3>
              <p>
                Multi-type input with password visibility toggle and clearable
                functionality.
              </p>
            </div>
            <div className="feature-card">
              <h3>🔔 Toast Notifications</h3>
              <p>
                Animated toast notifications with auto-dismiss and multiple
                types.
              </p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Sidebar</h3>
              <p>
                Sliding sidebar menu with nested items and smooth animations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SidebarMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={menuItems}
        title="Navigation Menu"
        position="right"
      />

      <Toast
        type="success"
        title="Success!"
        message="This is a demo toast notification."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={4000}
      />
    </div>
  );
}

export default App;

# React Component Library

A modern, type-safe React component library built with TypeScript, Storybook, and Framer Motion. This library provides three main reusable UI components with smooth animations and comprehensive functionality.

## 📸 Component Showcase

### Input Component
<img width="280" height="333" alt="image" src="https://github.com/user-attachments/assets/19ffac3c-428a-4617-9f69-6393cdace153" />

*Various input states: text, password with visibility toggle, clearable, error state, and different sizes*

### Toast Component  
<img width="362" height="133" alt="image" src="https://github.com/user-attachments/assets/d9d08b8c-d84f-4095-a467-bf91bad07a24" />

*Toast notifications in different positions with success, error, warning, and info types*

### Sidebar Menu Component
<img width="746" height="780" alt="image" src="https://github.com/user-attachments/assets/13fa32a9-c1d3-41a1-8625-293dc2c7c747" />
  
*Responsive sidebar with nested menu items and smooth sliding animations*

### Storybook Interface
<img width="1440" height="780" alt="image" src="https://github.com/user-attachments/assets/9a806ae9-7879-4310-a3fb-d81b6e362d48" />

*Interactive component documentation and testing environment*

## 🚀 Features

- **TypeScript** - Full type safety and excellent developer experience
- **Storybook** - Interactive component documentation and testing
- **Framer Motion** - Smooth animations and transitions
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Built-in dark theme compatibility
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

## 📦 Components

### 1. Input Component
A versatile input component with advanced features:
- **Password visibility toggle** - Eye icon to show/hide passwords
- **Clearable functionality** - X button to clear input content
- **Multiple types** - text, password, email, number, tel, url
- **Error states** - Built-in error handling and display
- **Multiple sizes** - small, medium, large variants
- **Multiple variants** - outlined, filled styles

### 2. Toast Component
An animated notification system:
- **Multiple types** - success, error, warning, info with appropriate icons
- **Auto-dismiss** - Configurable duration or manual close
- **Positioning** - Support for all four corners
- **Smooth animations** - Slide and fade transitions
- **Progress indicator** - Visual countdown for auto-dismiss
- **Container support** - Multiple toasts management

### 3. Sidebar Menu Component
A responsive navigation sidebar:
- **Nested menu items** - Unlimited nesting levels with accordion behavior
- **Sliding animations** - Smooth slide-in/out from left or right
- **Overlay support** - Optional backdrop blur effect
- **Icons and badges** - Support for Lucide React icons and notification badges
- **Keyboard navigation** - Full keyboard and accessibility support
- **Responsive** - Mobile-friendly with touch support

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Install
```bash
git clone <repository-url>
cd react-component-library
npm install
```

### 2. Development Server
```bash
npm run dev
```
Runs the demo application at `http://localhost:5173`

### 3. Storybook
```bash
npm run storybook
```
Launches Storybook at `http://localhost:6006`

### 4. Build
```bash
npm run build
```
Creates production build in `dist/` folder

## 📖 Usage Examples

### Input Component
```tsx
import { Input } from './components/Input';

// Basic text input
<Input 
  label="Username" 
  placeholder="Enter username..." 
/>

// Password with visibility toggle
<Input 
  type="password"
  label="Password"
  placeholder="Enter password..."
  clearable
/>

// Input with error state
<Input 
  type="email"
  label="Email"
  error="Please enter a valid email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Toast Component
```tsx
import { Toast, ToastContainer } from './components/Toast';

// Single toast
<Toast
  type="success"
  title="Success!"
  message="Data saved successfully"
  isVisible={showToast}
  onClose={() => setShowToast(false)}
/>

// Multiple toasts with container
<ToastContainer
  toasts={toastList}
  onRemoveToast={removeToast}
  position="bottom-right"
/>
```

### Sidebar Menu Component
```tsx
import { SidebarMenu } from './components/SidebarMenu';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home size={18} />,
    href: '/dashboard'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    children: [
      {
        id: 'profile',
        label: 'Profile Settings',
        href: '/settings/profile'
      }
    ]
  }
];

<SidebarMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  items={menuItems}
  title="Navigation"
  position="right"
/>
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Input/
│   │   ├── Input.tsx          # Main component
│   │   ├── Input.css          # Component styles
│   │   ├── Input.stories.tsx  # Storybook stories
│   │   └── index.ts          # Export file
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   ├── Toast.css
│   │   ├── Toast.stories.tsx
│   │   └── index.ts
│   └── SidebarMenu/
│       ├── SidebarMenu.tsx
│       ├── SidebarMenu.css
│       ├── SidebarMenu.stories.tsx
│       └── index.ts
├── App.tsx                   # Demo application
├── App.css                   # Demo styles
├── index.ts                  # Main export file
└── main.tsx                  # Application entry
```

## 🧪 Testing with Storybook

Each component includes comprehensive Storybook stories demonstrating:

- **All component variants and states**
- **Interactive controls** for real-time prop editing
- **Accessibility features** testing
- **Responsive behavior** across different screen sizes
- **Use case examples** and documentation

### Available Stories:

**Input Component:**
- Default, Password, Clearable
- Error states and validation
- Size variants (small, medium, large)
- Filled vs outlined variants

**Toast Component:**
- All types (success, error, warning, info)
- Different durations and positions
- Interactive demo with multiple toasts

**Sidebar Menu Component:**
- Basic menu and nested items
- Left/right positioning
- Interactive demo with state management

## 🎯 Code Quality

- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Static type checking
- **CSS Custom Properties** - Theming support
- **Semantic HTML** - Proper accessibility markup

## 🚀 Performance Features

- **Lazy loading** - Components load only when needed
- **Framer Motion** - Hardware-accelerated animations
- **CSS containment** - Optimized rendering
- **Tree shaking** - Bundle optimization support

## 📱 Responsive Design

All components are built with mobile-first principles:
- Touch-friendly interactive elements
- Responsive breakpoints
- Flexible layouts
- Optimized for various screen sizes

## 🌙 Dark Mode

Built-in support for dark mode using CSS custom properties:
```css
@media (prefers-color-scheme: dark) {
  /* Dark theme styles */
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Storybook Demo**: Run `npm run storybook`
- **Live Demo**: Run `npm run dev`

---

Built with ❤️ using React, TypeScript, and Storybook

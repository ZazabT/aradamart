# AradaMart - E-Commerce Mobile App 🛍️

A modern, feature-rich e-commerce mobile application built with React Native and Expo. Browse products, manage favorites, and access admin features with a clean, intuitive interface.

---

## 🛠️ Tech Stack

### Frontend
- **React Native** (v0.81.5) - Cross-platform mobile framework
- **Expo** (v54.0.25) - Development platform for React Native
- **Expo Router** (v6.0.15) - File-based routing
- **TypeScript** - Type-safe development
- **NativeWind** (v4.2.1) - Tailwind CSS for React Native


### State Management & Storage
- **Zustand** (v5.0.8) - Lightweight state management
- **In-Memory Storage** - User and product data

### UI & Styling
- **Expo Vector Icons** - Icon library
- **React Native Reanimated** - Smooth animations
- **Tailwind CSS** - Utility-first styling

### API
- **DummyJSON** - Mock product data API

---

## 📁 Project Structure

```
aradamart/
├── app/                          # Main app directory (Expo Router)
│   ├── _layout.tsx              # Root layout & auth check
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx          # Tab layout (Home, Wishlist)
│   │   ├── index.tsx            # Home screen - product list
│   │   └── explore.tsx          # Wishlist/Favorites screen
│   ├── auth/                    # Authentication screens
│   │   ├── _layout.tsx          # Auth layout
│   │   ├── login.tsx            # Login screen
│   │   └── register.tsx         # Registration screen
│   ├── admin/                   # Admin dashboard
│   │   ├── _layout.tsx          # Admin layout
│   │   ├── index.tsx            # Admin dashboard with tabs
│   │   ├── products/            # Product management
│   │   │   ├── tab.tsx          # Products list
│   │   │  
│   │   ├── users/               # User management
│   │   │   ├── tab.tsx          # Users list
│   │   │  
│   │   └── activity/            # Activity log
│   │       └── tab.tsx          # Activity history
│   ├── products/                # Product details
│   │   ├── _layout.tsx          # Products layout
│   │   └── [id].tsx             # Product detail page
│   ├── modal.tsx                # Modal screen
│   └── index.tsx                # Root index
│
├── components/                  # Reusable components
│   ├── common/                  # Common components
│   │   ├── NavBar.tsx           # Top navigation with sidebar menu
│   │   ├── SearchBar.tsx        # Product search
│   │   ├── CategoryScroll.tsx   # Category filter
│   │   └── PaginationFooter.tsx # Pagination
│   ├── product/                 # Product components
│   │   ├── ProductCard.tsx      # Product grid card
│   │   ├── ImageGallery.tsx     # Product image carousel
│   │   ├── SizeSelector.tsx     # Size selection
│   │   └── QuantitySelector.tsx # Quantity picker
│   ├── admin/                   # Admin components
│   │   ├── AdminProductForm.tsx # Product form
│   │   └── AdminUserForm.tsx    # User form
│   ├── themed-text.tsx          # Dark mode text
│   └── themed-view.tsx          # Dark mode view
│
├── stores/                      # Zustand state management
│   ├── authStore.ts             # User authentication state
│   ├── productStore.ts          # Products & categories
│   ├── favoritesStore.ts        # Favorite products
│   ├── inventoryStore.ts        # Admin product inventory
│   ├── userStore.ts             # Admin user management
│   └── transactionStore.ts      # Activity logging
│
├── lib/                         # Utilities & API
│   └── api/
│       └── products.ts          # DummyJSON API calls
│
├── hooks/                       # Custom React hooks
│   ├── use-color-scheme.ts      # Dark mode detection
│   └── usePagination.ts         # Pagination logic
│
├── constants/                   # App constants
│   ├── routes.ts                # Route definitions
│   ├── pagination.ts            # Pagination settings
│   └── format.ts                # Formatting utilities
│
├── types/                       # TypeScript type definitions
│   ├── product.ts               # Product types
│   ├── user.ts                  # User types
│   └── common.ts                # Common types
│
├── assets/                      # Images & static files
│   └── images/
│       └── arada.png            # App logo
│
├── global.css                   # Global styles
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── app.json                     # Expo app config
└── package.json                 # Dependencies
```

---

## 🔄 App Flow

### 1. **Authentication Flow**
```
App Start
  ↓
Check if user logged in (authStore)
  ├─ NO → /auth/login
  │   ├─ Login with email & password
  │   └─ Route based on role:
  │       ├─ Admin → /admin
  │       └─ User → /(tabs)
  │
  ├─ Register new account
  │   └─ Create user & auto-login
  │
  └─ YES → Route to appropriate screen
```

### 2. **User Flow (Normal User)**
```
Home Screen (/(tabs)/index)
  ├─ Browse products
  ├─ Search by name
  ├─ Filter by category
  ├─ View product details (/products/[id])
  │   ├─ Add to favorites
  │   ├─ Select size & quantity
  │   ├─ Add to cart
  │   └─ Buy now
  │
  ├─ Sidebar Menu
  │   ├─ Home
  │   ├─ Favorites (/(tabs)/explore)
  │   ├─ Admin (if admin user)
  │   └─ Logout
  │
  └─ Wishlist Screen (/(tabs)/explore)
      └─ View favorite products
```

### 3. **Admin Flow**
```
Admin Dashboard (/admin)
  ├─ Tab 1: Products Management
  │   ├─ View all products
  │   ├─ Create new product
  │   ├─ Edit product
  │   ├─ Adjust stock (±)
  │   └─ Delete product
  │
  ├─ Tab 2: Users Management
  │   ├─ View all users
  │   ├─ Create new user
  │   ├─ Edit user
  │   ├─ Change user role
  │   └─ Delete user
  │
  └─ Tab 3: Activity Log
      ├─ View all admin action
      └─ See timestamps
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZazabT/aradamart.git
   cd aradamart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm expo start
   ```

4. **Run on device/emulator**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

---

##  Default Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123

### Regular User Account
- **Email:** user@example.com
- **Password:** user123

---

## 🔐 Authentication

- **Method:** Email & Password (in-memory)
- **Storage:** Zustand store (authStore)
- **Role-based routing:** Admin users → `/admin`, Regular users → `/(tabs)`
- **Logout:** Clears auth state and returns to login

---

##  Features

### User Features
- ✅ Browse products from DummyJSON API
- ✅ Search products by name
- ✅ Filter by category
- ✅ View detailed product information
- ✅ Add/remove favorites
- ✅ Select size and quantity
- ✅ Add to cart & checkout
- ✅ Dark mode support
- ✅ Responsive design

### Admin Features
- ✅ Manage products (CRUD)
- ✅ Manage users (CRUD)
- ✅ Adjust product stock
- ✅ Track all admin activities
- ✅ Role-based access control
- ✅ Activity logging with timestamps

---

## 🎨 UI Components

### Navigation
- **NavBar** - Top bar with menu, notifications, and cart
- **Sidebar Menu** - Slide-out navigation with user info
- **Tab Navigation** - Bottom tabs for main screens

### Product Display
- **ProductCard** - Grid item with image, name, price
- **ImageGallery** - Product image carousel
- **CategoryScroll** - Horizontal category filter

### Forms
- **SearchBar** - Product search input
- **SizeSelector** - Size options (XS, S, M, L, XL)
- **QuantitySelector** - Increment/decrement quantity

---

##  State Management (Zustand Stores)

### authStore
- Current user state
- Login/Register/Logout functions
- Role-based access

### productStore
- Product list & search
- Categories
- Filtered products
- Loading/error states

### favoritesStore
- Favorite products list
- Add/remove favorites
- Check if product is favorited

### inventoryStore (Admin)
- Product CRUD operations
- Stock management

### userStore (Admin)
- User CRUD operations
- Role management

### transactionStore (Admin)
- Activity logging

---

## 🔧 Configuration

### Environment Variables
Create `.env.local` if needed for API endpoints:
```
EXPO_PUBLIC_API_URL=https://dummyjson.com
```

### Tailwind CSS
Configured in `tailwind.config.js` with custom colors and utilities.

### TypeScript
Strict mode enabled in `tsconfig.json` for type safety.

---

## 📸 Screenshots
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.07_1a08319d.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.09_03899dc5.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.09_a8857c96.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.08_d37df3b3.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.08_22b91fd6.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.11_0c625aca.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.10_02e358b6.jpg?raw=true)
![image alt](https://github.com/ZazabT/aradamart/blob/main/screenshots/WhatsApp%20Image%202025-11-21%20at%2020.11.11_2bb50658.jpg?raw=true)

## 🐛 Troubleshooting

### App won't start
```bash
npm install
npm start
```

### Port already in use
```bash
expo start -c  # Clear cache
```

### TypeScript errors
```bash
npm run lint
```

### Reset project
```bash
npm run reset-project
```

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/router/introduction)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [NativeWind Docs](https://www.nativewind.dev)

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Development

### Available Scripts
```bash
npm start          # Start dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

---
---

**Last Updated:** November 2025

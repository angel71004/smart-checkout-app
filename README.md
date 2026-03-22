# Smart eCommerce Checkout Workflow

A premium, responsive React-based eCommerce checkout experience built with **Vite**, **Tailwind CSS**, and **React Context API**.

## 🚀 Key Features

- **Product Showcase**: A visual grid of curated products with interactive "Add to Cart" functionality and category filtering.
- **Dynamic Shopping Cart**: Real-time cart updates, quantity management, and automated calculations for subtotal, tax, and totals.
- **Intelligent Checkout**: A structured multi-step flow that guides users through:
  - **Shipping**: Address and shipping method selection.
  - **Payment**: Secure payment entry with visual card simulation.
  - **Review**: Complete order summary for final verification.
- **Order Confirmation**: Clean success state with order tracking details and estimated delivery.
- **Premium UI**: Modern dark/light aesthetics, glassmorphism headers, smooth animations, and a fully responsive layout.

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: CSS Transitions & Framer Motion (ready configuration)

## 📁 Project Structure

```text
smart-checkout-app/
├── src/
│   ├── components/       # Reusable UI components (Header, ProductCard, etc.)
│   ├── context/          # Global state management (CartContext)
│   ├── data/             # Mock product data
│   ├── hooks/            # Custom React hooks (useCart)
│   ├── pages/            # Core application pages (Home, Cart, Checkout, Confirmation)
│   ├── App.jsx           # Main routing & layout
│   └── main.jsx          # Entry point
├── tailwind.config.js    # Custom design tokens
└── package.json          # Dependencies & scripts
```

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📝 Configuration

The project is pre-configured with a custom Tailwind color palette (`primary-50` to `primary-900`) and the `Inter` font family for a sleek, professional look.

---
*Built with ❤️ for a seamless shopping experience.*

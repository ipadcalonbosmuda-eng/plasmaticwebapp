# Plasmatic Tools - Professional Web3 Application

A modern, secure, and professional Web3 application built for the Plasma Network. This application provides comprehensive tools for token management, liquidity locking, vesting schedules, and multi-send functionality.

## 🚀 Features

### ✅ **Implemented**
- **Modern Next.js 14** with App Router and TypeScript
- **Professional Web3 Integration** with Wagmi v2 and RainbowKit
- **Multi-Wallet Support** via WalletConnect v2
- **Plasma Network Optimization** with automatic network switching
- **Responsive Design** with Tailwind CSS
- **Custom PPMori Fonts** for brand consistency
- **Real-time Balance Display** and network status
- **Professional UI Components** with shadcn/ui patterns
- **Security Headers** and best practices
- **SEO Optimized** with proper meta tags

### 🔧 **Tools (Coming Soon)**
- **Token Creation** - Deploy custom tokens with advanced features
- **Token Locker** - Lock tokens with customizable schedules
- **Liquidity Locker** - Secure LP position management
- **Token Vesting** - Structured vesting for teams and investors
- **Multi-Send** - Bulk token distribution in single transactions

## 🏗️ **Architecture**

### **Frontend Stack**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons

### **Web3 Stack**
- **Wagmi v2** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **Viem** - TypeScript Ethereum library
- **TanStack Query** - Data fetching and caching

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🔧 **Setup & Installation**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd plasmatic-web3-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your values
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 **Plasma Network Configuration**

The application is optimized for Plasma Network with the following configuration:

```typescript
{
  chainId: 9745,
  chainName: 'Plasma Mainnet Beta',
  nativeCurrency: {
    name: 'XPL',
    symbol: 'XPL',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.plasma.to'],
  blockExplorerUrls: ['https://plasmascan.to/'],
}
```

## 📱 **Wallet Integration**

### **Supported Wallets**
- MetaMask
- WalletConnect v2 compatible wallets
- Coinbase Wallet
- Rainbow Wallet
- And many more via RainbowKit

### **Features**
- Automatic network detection and switching
- Real-time balance updates
- Secure connection management
- Mobile wallet support via WalletConnect

## 🎨 **Design System**

### **Colors**
- **Primary**: Emerald/Teal gradient (#00d4aa to #00a88a)
- **Background**: Light gradients (slate-50 to gray-100)
- **Text**: Professional grays
- **Accents**: Status-specific colors

### **Typography**
- **Headings**: PPMori SemiBold (600)
- **Body**: PPMori Regular (400)
- **Fallback**: System fonts

### **Components**
- Glass morphism effects
- Smooth animations and transitions
- Consistent spacing and sizing
- Mobile-first responsive design

## 🔒 **Security Features**

- **Type Safety** with TypeScript
- **Security Headers** (CSP, X-Frame-Options, etc.)
- **Input Validation** and sanitization
- **Secure Wallet Connections** via established libraries
- **Environment Variable Protection**
- **Code Splitting** for optimal loading

## 📊 **Performance**

- **Server-Side Rendering** (SSR) support
- **Static Generation** where applicable
- **Code Splitting** and lazy loading
- **Optimized Images** and assets
- **Minimal Bundle Size** with tree shaking

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm run build
npm run start
```

### **Docker**
```bash
# Build image
docker build -t plasmatic-tools .

# Run container
docker run -p 3000:3000 plasmatic-tools
```

### **Environment Variables for Production**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_APP_URL`
- Analytics IDs (if using)

## 🧪 **Development**

### **Available Scripts**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
npm run type-check   # TypeScript checking
```

### **Project Structure**
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── config/             # Configuration files
├── providers/          # Context providers
└── lib/                # Utility functions
```

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 **Links**

- **Website**: https://www.plasmatic.tools/
- **App**: https://app.plasmatic.tools/
- **Plasma Network**: https://plasma.to/
- **Block Explorer**: https://plasmascan.to/

## 📞 **Support**

For support, please visit our documentation or contact the team through official channels.

---

**Built with ❤️ for the Plasma Network ecosystem**
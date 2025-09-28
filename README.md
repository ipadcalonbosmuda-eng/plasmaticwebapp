# Plasmatic Tools - Web3 Tools for Plasma Network

A comprehensive web application for managing Web3 tools on the Plasma Network, including token creation, token locking, liquidity locking, token vesting, and multi-send functionality.

## Features

### ✅ Implemented
- **Responsive Dashboard** with modern glassmorphism UI
- **Sidebar Navigation** with Dashboard and Tools sections
- **Wallet Connection** with MetaMask integration
- **Plasma Network Detection** and automatic network switching
- **Balance Display** showing native XPL tokens
- **24-Hour Countdown Timer** for coming soon tools
- **Custom PPMori Fonts** (SemiBold for headings, Regular for content)
- **Mobile Responsive Design**

### 🔧 Tools (Coming Soon)
- Token Creation
- Token Locker
- Liquidity Locker
- Token Vesting
- Multi-Send

## Network Configuration

**Plasma Mainnet Beta**
- Chain ID: 9745 (0x2611)
- Currency: XPL
- RPC: https://rpc.plasma.to
- Explorer: https://plasmascan.to/

## Project Structure

```
plasmaticwebapp/
├── index.html          # Main HTML file
├── styles.css          # CSS with custom PPMori fonts
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/
    ├── PPMori-Regular.woff2    # Regular font weight
    └── PPMori-SemiBold.woff2   # SemiBold font weight
```

## Features Overview

### 🎨 Design
- Modern dark theme with glassmorphism effects
- Custom PPMori font family
- Responsive design for all devices
- Smooth animations and transitions

### 🔗 Wallet Integration
- MetaMask connection
- Automatic Plasma network detection
- Network switching functionality
- Real-time balance updates
- Account change handling

### 📱 Navigation
- Sidebar with Dashboard and Tools sections
- Page switching with fade animations
- Active state management
- Mobile menu for smaller screens

### ⏰ Timer System
- 24-hour countdown for tool launches
- Real-time updates every second
- Automatic "Live Now!" display when timer expires

### 🔧 Developer Features
- Console debugging tools
- Keyboard shortcuts (Alt+C for wallet, Alt+D for dashboard)
- Error handling with toast notifications
- Network status monitoring

## Usage

1. Open `index.html` in a web browser
2. Connect your Web3 wallet (MetaMask recommended)
3. The app will automatically detect and switch to Plasma Network
4. Navigate through the sidebar to explore different sections
5. Tools will be available after the countdown timer expires

## Keyboard Shortcuts

- `Alt + C`: Connect/Disconnect Wallet
- `Alt + D`: Go to Dashboard

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires a Web3 wallet extension (MetaMask, WalletConnect, etc.)

## Development

The app is built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance. No build process required - simply open `index.html` in a browser.

## License

Built for Plasmatic Tools project.

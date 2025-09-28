// Plasma Network Configuration
const PLASMA_NETWORK = {
    chainId: '0x2611', // 9745 in hex
    chainName: 'Plasma Mainnet Beta',
    nativeCurrency: {
        name: 'XPL',
        symbol: 'XPL',
        decimals: 18
    },
    rpcUrls: ['https://rpc.plasma.to'],
    blockExplorerUrls: ['https://plasmascan.to/']
};

// Global state
let isWalletConnected = false;
let userAccount = null;
let web3Provider = null;

// DOM Elements
const connectWalletBtn = document.getElementById('connect-wallet');
const networkInfo = document.getElementById('network-info');
const networkStatus = document.getElementById('network-status');
const balanceDisplay = document.getElementById('balance-display');
const pageTitle = document.getElementById('page-title');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    setupWalletConnection();
    startCountdownTimer();
    checkNetworkStatus();
});

function initializeApp() {
    console.log('🔥 Plasmatic Tools initialized');
    
    // Check if wallet is already connected
    if (typeof window.ethereum !== 'undefined') {
        checkExistingConnection();
    }
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            if (targetPage) {
                switchPage(targetPage);
                updateActiveNavItem(link);
            }
        });
    });
}

function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(`${pageId}-page`);
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update page title
        const pageTitles = {
            'dashboard': 'Dashboard',
            'token-creation': 'Token Creation',
            'token-locker': 'Token Locker',
            'liquidity-locker': 'Liquidity Locker',
            'token-vesting': 'Token Vesting',
            'multi-send': 'Multi-Send'
        };
        
        pageTitle.textContent = pageTitles[pageId] || 'Dashboard';
    }
}

function updateActiveNavItem(activeLink) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    activeLink.parentElement.classList.add('active');
}

// Wallet Connection
function setupWalletConnection() {
    connectWalletBtn.addEventListener('click', handleWalletConnection);
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
    }
}

async function handleWalletConnection() {
    if (!window.ethereum) {
        alert('Please install MetaMask or another Web3 wallet to use this application.');
        return;
    }
    
    try {
        if (!isWalletConnected) {
            await connectWallet();
        } else {
            disconnectWallet();
        }
    } catch (error) {
        console.error('Wallet connection error:', error);
        showError('Failed to connect wallet. Please try again.');
    }
}

async function connectWallet() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        if (accounts.length === 0) {
            throw new Error('No accounts found');
        }
        
        userAccount = accounts[0];
        
        // Check if we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (chainId !== PLASMA_NETWORK.chainId) {
            await switchToPlasmaNetwork();
        }
        
        // Update UI
        isWalletConnected = true;
        updateWalletUI();
        
        // Get balance
        await updateBalance();
        
        console.log('✅ Wallet connected:', userAccount);
        
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}

async function switchToPlasmaNetwork() {
    try {
        // Try to switch to Plasma network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: PLASMA_NETWORK.chainId }],
        });
    } catch (switchError) {
        // If the network doesn't exist, add it
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [PLASMA_NETWORK],
                });
            } catch (addError) {
                throw new Error('Failed to add Plasma network to wallet');
            }
        } else {
            throw switchError;
        }
    }
}

function disconnectWallet() {
    isWalletConnected = false;
    userAccount = null;
    web3Provider = null;
    updateWalletUI();
    console.log('🔌 Wallet disconnected');
}

function updateWalletUI() {
    if (isWalletConnected && userAccount) {
        connectWalletBtn.textContent = `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
        connectWalletBtn.classList.add('connected');
        
        networkInfo.innerHTML = `
            <span class="network-status success">🟢 Plasma Network</span>
        `;
    } else {
        connectWalletBtn.textContent = 'Connect Wallet';
        connectWalletBtn.classList.remove('connected');
        
        networkInfo.innerHTML = `
            <span class="network-status">🔴 Not Connected</span>
        `;
        
        balanceDisplay.textContent = 'Connect wallet to view';
    }
}

async function updateBalance() {
    if (!isWalletConnected || !userAccount) return;
    
    try {
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [userAccount, 'latest']
        });
        
        // Convert from wei to XPL
        const balanceInXPL = parseInt(balance, 16) / Math.pow(10, 18);
        balanceDisplay.textContent = `${balanceInXPL.toFixed(4)} XPL`;
        
    } catch (error) {
        console.error('Balance fetch error:', error);
        balanceDisplay.textContent = 'Error fetching balance';
    }
}

async function checkExistingConnection() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            userAccount = accounts[0];
            isWalletConnected = true;
            updateWalletUI();
            await updateBalance();
        }
    } catch (error) {
        console.error('Check connection error:', error);
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else {
        userAccount = accounts[0];
        updateWalletUI();
        updateBalance();
    }
}

function handleChainChanged(chainId) {
    // Reload the page when chain changes
    window.location.reload();
}

// Countdown Timer (24 hours)
function startCountdownTimer() {
    // Set target time to 24 hours from now
    const targetTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance < 0) {
            // Timer finished
            document.querySelectorAll('.countdown-timer').forEach(timer => {
                timer.innerHTML = `
                    <div class="time-unit">
                        <span class="time-number">🎉</span>
                        <span class="time-label">Live Now!</span>
                    </div>
                `;
            });
            return;
        }
        
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update all countdown timers
        document.querySelectorAll('.countdown-timer').forEach(timer => {
            const hoursEl = timer.querySelector('#hours') || timer.querySelector('.time-number');
            const minutesEl = timer.querySelector('#minutes') || timer.querySelectorAll('.time-number')[1];
            const secondsEl = timer.querySelector('#seconds') || timer.querySelectorAll('.time-number')[2];
            
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        });
    }
    
    // Update timer immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Network Status Check
async function checkNetworkStatus() {
    try {
        const response = await fetch('https://rpc.plasma.to', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1
            })
        });
        
        if (response.ok) {
            networkStatus.textContent = '🟢 Online';
            networkStatus.classList.add('success');
        } else {
            throw new Error('Network request failed');
        }
    } catch (error) {
        networkStatus.textContent = '🔴 Checking...';
        networkStatus.classList.add('error');
        console.error('Network status check failed:', error);
    }
}

// Utility Functions
function showError(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-family: 'PPMori', sans-serif;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function showSuccess(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-family: 'PPMori', sans-serif;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button for small screens
if (window.innerWidth <= 768) {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(99, 102, 241, 0.9);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 300;
        display: none;
    `;
    
    if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    document.body.appendChild(mobileMenuBtn);
}

// Handle window resize
window.addEventListener('resize', () => {
    const mobileMenuBtn = document.querySelector('button[style*="position: fixed"]');
    if (window.innerWidth <= 768) {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
    } else {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + C to connect/disconnect wallet
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        handleWalletConnection();
    }
    
    // Alt + D to go to dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        switchPage('dashboard');
        updateActiveNavItem(document.querySelector('[data-page="dashboard"]'));
    }
});

// Initialize tooltips and animations
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pulse effect to connect wallet button when not connected
    setInterval(() => {
        if (!isWalletConnected) {
            connectWalletBtn.classList.add('pulse');
            setTimeout(() => {
                connectWalletBtn.classList.remove('pulse');
            }, 2000);
        }
    }, 10000);
});

// Console welcome message
console.log(`
🔥 Welcome to Plasmatic Tools!
🌐 Built for Plasma Network
⚡ Web3 Tools at your fingertips

Commands:
- Alt + C: Connect/Disconnect Wallet
- Alt + D: Go to Dashboard

Network: ${PLASMA_NETWORK.chainName}
Chain ID: ${parseInt(PLASMA_NETWORK.chainId, 16)}
RPC: ${PLASMA_NETWORK.rpcUrls[0]}
Explorer: ${PLASMA_NETWORK.blockExplorerUrls[0]}
`);

// Export functions for debugging
window.plasmaticDebug = {
    connectWallet,
    disconnectWallet,
    switchPage,
    updateBalance,
    checkNetworkStatus,
    PLASMA_NETWORK
};

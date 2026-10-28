// Murugan Trader ADMIN - Windows desktop wrapper.
// NOTE: Electron 22 is the LAST version that runs on Windows 7/8/8.1. Do not upgrade it.
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const SITE_URL = 'https://www.adpc.shop/admin';          // <-- website URL
const ALLOWED_HOSTS = [
  'www.adpc.shop', 'adpc.shop',
  'checkout.razorpay.com', 'api.razorpay.com',      // payments
  'fonts.googleapis.com', 'fonts.gstatic.com'
];

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 380, minHeight: 600,
    title: 'Murugan Trader Admin',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#ffffff',
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  win.once('ready-to-show', () => { win.maximize(); win.show(); });

  win.loadURL(SITE_URL);

  // No internet / server down -> friendly offline page with Retry
  win.webContents.on('did-fail-load', (_e, code, _d, url, isMainFrame) => {
    if (isMainFrame && code !== -3) {
      win.loadFile(path.join(__dirname, 'offline.html'));
    }
  });

  // Open unknown links in the normal browser, keep site + payment inside the app
  win.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const h = new URL(url).hostname;
      if (ALLOWED_HOSTS.includes(h)) return { action: 'allow' };
    } catch (e) {}
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    try {
      const u = new URL(url);
      if (u.protocol === 'file:') return;
      if (!ALLOWED_HOSTS.includes(u.hostname)) { e.preventDefault(); shell.openExternal(url); }
    } catch (err) { e.preventDefault(); }
  });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

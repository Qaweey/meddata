import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import Home from './pages/Home';
import MainPage from './pages/MainPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import View from './components/View';
import Uploads from './components/Uploads';
import Authorize from './components/Authorize';

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: 'MSN9LSJF3HJ-c6DT-JgG_6xSXtN4rO3j' }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        appInfo={{
          appName: 'MedData',
        }}
        theme={lightTheme({
          accentColor: '#ed8936',
          accentColorForeground: '#ffffff',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/view" element={<View />} />
              <Route path="/uploads" element={<Uploads />} />
              <Route path="/authorize" element={<Authorize />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

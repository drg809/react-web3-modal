import React, { useState, useContext, createContext } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import WalletModal from './components/WalletModal';
import ThemeProvider from './theme';

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 1000;
  return library;
}

const Web3Context = createContext({});

const Web3ContextProvider = ({ config, children }) => {
  const [showModal, setShowModal] = useState(false);
  const { account, library, chainId, connector } = useWeb3React();
  const openWalletModal = () => setShowModal(true);
  return (
    <Web3Context.Provider value={{ library, account, chainId, connector, openWalletModal }}>
      {children}
      <WalletModal config={config} isOpen={showModal} onClose={() => setShowModal(false)} />
    </Web3Context.Provider>
  );
};

export const Web3Provider = ({ config, children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider>
        <Web3ContextProvider config={config}>
          {children}
        </Web3ContextProvider>
      </ThemeProvider>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
    </Web3ReactProvider>
  )
};

export const useWeb3 = () => useContext(Web3Context);

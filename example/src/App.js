import React from 'react'

import { Web3Provider, useWeb3 } from 'react-web3-modal'
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 40px;
  border: 1px solid #4287f5;
  border-radius: 8px;
  background: #4287f5;
  color: #fff;
  cursor: pointer;
  :hover {
    border-color: #2b75ed;
    background: #2b75ed;
  }
  :focus {
    outline: none;
  }
`;

const ConnectButton = () => {
  const { openWalletModal } = useWeb3();
  return <Button onClick={openWalletModal}>Connect wallet</Button>;
}

const config = {
  supportedChainIds: [1, 100],
  connectors: {
    walletconnect: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
        // 100: 'https://dai.poa.network',
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: 15000
    },
  },
};

export default function App() {
  return (
    <Web3Provider config={config}>
      <ConnectButton />
    </Web3Provider>
  );
}


import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { FortmaticConnector } from './Fortmatic';

import { SUPPORTED_WALLETS } from '../constants';

const connectors = {
  injected: InjectedConnector,
  walletconnect: WalletConnectConnector,
  walletlink: WalletLinkConnector,
  fortmatic: FortmaticConnector,
  portis: PortisConnector,
};

export function getSupportedWallets(config) {
  const injected = new connectors['injected']({
    supportedChainIds: config.supportedChainIds,
  });
  const supportedWallets = {
    injected: {
      connector: injected,
      ...SUPPORTED_WALLETS['injected'],
    },
    metamask: {
      connector: injected,
      ...SUPPORTED_WALLETS['metamask'],
    },
  };
  Object.keys(config.connectors).forEach(key => {
    supportedWallets[key] = {
      connector: new connectors[key](config.connectors[key]),
      ...SUPPORTED_WALLETS[key],
    };
  });
  return supportedWallets;
}

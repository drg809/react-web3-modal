import React from 'react';
import styled from 'styled-components';
import { useWeb3 } from '../../index';
import { shortenAddress } from '../../utils';
import Copy from './Copy';

import { ReactComponent as Close } from '../../images/x.svg';
import CoinbaseWalletIcon from '../../images/coinbaseWalletIcon.svg';
import WalletConnectIcon from '../../images/walletConnectIcon.svg';
import FortmaticIcon from '../../images/fortmaticIcon.png';
import PortisIcon from '../../images/portisIcon.png';
import Identicon from '../Identicon';
import { Text } from '../Text';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
  h5:last-child {
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};
  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }
  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.25rem;
  a:hover {
    text-decoration: underline;
  }
  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

const WalletAction = styled.button`
  margin-left: 8px;
  padding: 4px 6px;
  border: 1px solid #adcaf7;
  border-radius: 12px;
  background: #fff;
  :hover {
    cursor: pointer;
    border-color: #4287f5;
  }
  :focus {
    outline: none;
  }
`;

const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.primary1};
`;

export default function AccountDetails({
  onClose,
  ENSName,
  openOptions,
  supportedWallets
}) {
  const { account, connector } = useWeb3();

  const { injected, walletconnect, walletlink, fortmatic, portis } = supportedWallets;

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(supportedWallets)
      .filter(
        k =>
          supportedWallets[k].connector === connector && (connector !== injected?.connector || isMetaMask === (k === 'metamask'))
      )
      .map(k => supportedWallets[k].name)[0];
    return <Text size={14} color="#888D9B">Connected with {name}</Text>;
  }

  function getStatusIcon() {
    if (connector === injected?.connector) {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      );
    } else if (connector === walletconnect?.connector) {
      return (
        <IconWrapper size={16}>
          <img src={WalletConnectIcon} alt={'wallet connect logo'} />
        </IconWrapper>
      );
    } else if (connector === walletlink?.connector) {
      return (
        <IconWrapper size={16}>
          <img src={CoinbaseWalletIcon} alt={'coinbase wallet logo'} />
        </IconWrapper>
      );
    } else if (connector === fortmatic?.connector) {
      return (
        <IconWrapper size={16}>
          <img src={FortmaticIcon} alt={'fortmatic logo'} />
        </IconWrapper>
      );
    } else if (connector === portis?.connector) {
      return (
        <>
          <IconWrapper size={16}>
            <img src={PortisIcon} alt={'portis logo'} />
            <MainWalletAction
              onClick={() => {
                portis.connector.portis.showPortis()
              }}
            >
              Show Portis
            </MainWalletAction>
          </IconWrapper>
        </>
      );
    }
    return null;
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={onClose}>
          <Close />
        </CloseIcon>
        <HeaderRow>
          <Text size={16}>Account</Text>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {connector !== injected?.connector && connector !== walletlink?.connector && (
                    <WalletAction
                      style={{ marginRight: '8px' }}
                      onClick={() => {
                        connector.close()
                      }}
                    >
                      <Text size={12} color="#4287f5">Disconnect</Text>
                    </WalletAction>
                  )}
                  <WalletAction
                    onClick={() => {
                      openOptions()
                    }}
                  >
                    <Text size={12} color="#4287f5">Change</Text>
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  <div>
                    {getStatusIcon()}
                    <Text size={20}> {account && shortenAddress(account)}</Text>
                    <Copy toCopy={account} />
                  </div>
                </AccountControl>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
    </>
  );
}

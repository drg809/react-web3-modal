import React from 'react';
import styled from 'styled-components';
import Option from './Option';
import Loader from './Loader';
import { Text } from './Text';
import { getWalletIcon } from '../utils';

const PendingSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const StyledLoader = styled(Loader)`
  margin-right: 1rem;
`;

const LoadingMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.red1 : 'inherit')};
  border: 1px solid ${({ theme, error }) => (error ? theme.red1 : theme.text4)};
  & > * {
    padding: 1rem;
  }
  height: 50px;
`;

const ErrorGroup = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`;

const ErrorButton = styled.button`
  margin-left: 8px;
  padding: 4px 6px;
  border: 1px solid #cfcfcf;
  border-radius: 12px;
  background: #fff;
  :hover {
    cursor: pointer;
    border-color: #999999;
  }
`;

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
  supportedWallets
}) {
  const isMetamask = window?.ethereum?.isMetaMask;

  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <Text size={16} color="#FD4040">Error connecting.</Text>
              <ErrorButton
                onClick={() => {
                  setPendingError(false)
                  connector && tryActivation(connector)
                }}
              >
                <Text size={12}>Try again</Text>
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <>
              <StyledLoader />
              <Text size={16}>Initializing...</Text>
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
      {Object.keys(supportedWallets).map(key => {
        const option = supportedWallets[key]
        if (option.connector === connector) {
          if (option.connector === supportedWallets['injected'].connector) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={getWalletIcon(key)}
            />
          )
        }
        return null
      })}
    </PendingSection>
  );
}


import React from 'react';
import styled from 'styled-components';

export const Text = ({ children, ...props }) => (
  <Default {...props}>{children}</Default>
);

export const TextMedium = ({ children, ...props }) => (
  <Medium {...props}>{children}</Medium>
);

export const TextBold = ({ children, ...props }) => (
  <Bold {...props}>{children}</Bold>
);
  

const Default = styled.span`
  color: ${props => props.color || '#242A31'};
  flex: ${props => props.flex};
  font-size: ${props => props.size ? props.size + 'px' : '14px'};
  font-family: 'Lato', sans-serif;
`;

const Medium = styled(Default)`
  font-weight: 500;
`;

const Bold = styled(Default)`
  font-weight: bold;
`;

import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  background: ${props => props.theme.footer};
  color: white;
  font-size: 11px;
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: -1
`;

export default Footer = () => (
  <FooterContainer className="flex-row">©2017 ReTrade</FooterContainer>
);

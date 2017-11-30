import styled from 'styled-components'
import { boxSizing,borderRadius, boxShadow, fontSmoothing } from '../../../../stylesheets/style.utils.js';


export const TextInput = styled.input.attrs({
  $auth: props => props.auth,
})`
  padding: 10px 12px 10px 12px;
  padding-left: ${props => props.$auth ? "50px" : "10px"};
  margin: 6px 0 6px;
  font-size: 18px;
  border: 1px solid #bbb;
  border-top-color: #999;
  ${boxSizing("border-box")}
  ${borderRadius("5px")}
  ${boxShadow("inset", "0", "1px", "2px", "rgba(0, 0, 0, .18)")}
  ${fontSmoothing("antialiased")}s
  
   &:focus {
     outline: none;
     border-color: ${props => props.theme.highlight};
     ${boxShadow("0", "0", "5px", "0px", "#BAD7FF")}
   }
`;

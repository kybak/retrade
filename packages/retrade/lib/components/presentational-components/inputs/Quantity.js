import styled from 'styled-components'
import { boxSizing,borderRadius, boxShadow, fontSmoothing } from '../../../stylesheets/style.utils.js';


export const Quantity = styled.input`
   width:60px;
   height: 33px;
   text-align: center;
   padding:5px;
   border: 1px solid #bbb;
   border-top-color: #999;
   ${boxSizing("border-box")}
   ${borderRadius("5px")}
   ${boxShadow("inset", "0", "1px", "2px", "rgba(0, 0, 0, .18)")}
   ${fontSmoothing("antialiased")}
   &:focus {
     outline: none;
     border-color: ${props => props.theme.highlight};
     ${boxShadow("0", "0", "5px", "0px", "#BAD7FF")}
   }
`;

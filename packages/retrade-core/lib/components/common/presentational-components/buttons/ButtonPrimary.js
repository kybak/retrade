import styled from 'styled-components'
import {borderRadius} from '../../../../stylesheets/style.utils.js';


export const ButtonPrimary = styled.button`
    padding: 19px;
    min-width: 320px;
    background: #4abc96;
    
    ${borderRadius(('5px'))};
    
    &:hover {
      background: #44ac89;
    }
  `;

import React from 'react';
import { NavLogoSC,NavLogoSCDiv } from './Logo';
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux'

const Images = styled.img`
  height:30px;
  resize:cover;
`;

export const NavLogo = React.memo((props) => {

  const dispatch = useDispatch()
  return (
            <NavLogoSCDiv  {...props} onClick={()=>{}} >
                  re<span>conecta</span>
            </NavLogoSCDiv>
  );
})

import React from "react";
import styled from "styled-components";

export default function Navbar() {
  return (
    <StyledNav>
      <p>Tweet to Image API</p>
      <small>demo</small>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  padding: 1rem;
  margin-bottom: 2rem;
`;

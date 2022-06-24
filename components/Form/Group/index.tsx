import React from 'react';
import theme, { styled } from 'theme/styled-components';

const Wrapper = styled.div`
  padding: 3rem 1.5rem 1rem 1.5rem;
  border: thin solid ${theme.primary.default};
  position: relative;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  display: block;
  position: absolute;
  top: -1.25rem;
  left: 1rem;
  background-color: #fff;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
  border: thin solid ${theme.primary.default};
`;

const FormGroup = ({ title, children }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default FormGroup;

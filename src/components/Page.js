import styled from 'styled-components';

export default function Page({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 780px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

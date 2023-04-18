import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 40px;
  border-radius: 5px;
  border: 2px solid #bdc3cc;
`;

export const LinkSentPage = () => {
  return (
    <Wrapper>
      <Container>
        <h1>Please confirm your e-mail</h1>
        <p style={{ textAlign: 'center' }}>
          The verification link has been sent to your e-mail address. Please
          confirm your e-mail address before signing in.
        </p>
      </Container>
    </Wrapper>
  );
};

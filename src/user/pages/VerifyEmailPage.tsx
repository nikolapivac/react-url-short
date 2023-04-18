import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ServerController } from '../../api/server.controller';

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

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        await ServerController.VerifyEmail.verify(code);
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [code]);

  return (
    <Wrapper>
      <Container>
        <h1>E-mail successfully verified!</h1>
        <p>Please sign in to start shortening URLs</p>
        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant='contained'
          color='primary'
          onClick={() => navigate('/signin')}
        >
          Sign in
        </Button>
      </Container>
    </Wrapper>
  );
};

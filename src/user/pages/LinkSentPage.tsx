import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  border-radius: 5px 5px 0 0;
  border: 2px solid #bdc3cc;
`;

const InfoContainer = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 0 40px 0 40px;
  background-color: #bdc3cc;
  border-radius: 0 0 5px 5px;
  border: 2px solid #bdc3cc;
`;

export const LinkSentPage = () => {
  const [info, setInfo] = useState('');
  const { email } = useParams();

  const handleResend = async () => {
    const response = await ServerController.ResendEmail.resendEmail(email);
    if (response.statusCode === 200) {
      setInfo('Link sent');
    } else if (response.statusCode === 400) {
      setInfo('Too many e-mails sent');
    }
  };

  return (
    <Wrapper>
      <Container>
        <h1>Please confirm your e-mail</h1>
        <p style={{ textAlign: 'center' }}>
          The verification link has been sent to your e-mail address. Please
          confirm your e-mail address before signing in.
        </p>
        <Button
          disabled={info === 'Too many e-mails sent'}
          style={{ marginTop: '10px' }}
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleResend}
        >
          RESEND E-MAIL
        </Button>
      </Container>

      {info && (
        <InfoContainer>
          <h3
            style={info === 'Link sent' ? { color: 'black' } : { color: 'red' }}
          >
            {info}
          </h3>
        </InfoContainer>
      )}
    </Wrapper>
  );
};

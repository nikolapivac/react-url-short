import { Button, FormControl, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ServerController } from '../../api/server.controller';
import { useUserContext } from '../components/UserContext';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
  border: 2px solid #bdc3cc;
`;

export const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [helperUser, setHelperUser] = useState('');
  const [helperPass, setHelperPass] = useState('');
  const navigate = useNavigate();

  const { login } = useUserContext();

  const validate = (credential: string) => {
    return credential.length === 0 ? false : true;
  };

  const handleSignIn = async () => {
    try {
      if (!helperPass && !helperUser) {
        const response = await ServerController.Authentication.signIn({
          username,
          password,
        });
        const token = response.accessToken;
        const validEmail = response.validEmail;
        const email = response.email;

        if (token) {
          if (!validEmail) {
            navigate(`/linksent/${email}`);
          } else {
            login?.(token);
            navigate('/urls');
          }
        } else {
          setErrorMsg('User not found. Please check your credentials.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Sign in</h1>
        <p>Enter your username and password to shorten your URLs</p>
        {errorMsg && <h3 style={{ color: 'red' }}>{errorMsg}</h3>}
        <FormControl fullWidth>
          <TextField
            required
            error={helperUser !== ''}
            label='Username'
            placeholder='Username'
            margin='dense'
            variant='outlined'
            helperText={helperUser}
            onChange={(e) => {
              if (validate(e.target.value)) {
                setHelperUser('');
                setUsername(e.target.value);
              } else {
                setHelperUser('Username is required');
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            error={helperPass !== ''}
            label='Password'
            type='password'
            placeholder='Password'
            margin='dense'
            variant='outlined'
            helperText={helperPass}
            onChange={(e) => {
              if (validate(e.target.value)) {
                setHelperPass('');
                setPassword(e.target.value);
              } else {
                setHelperPass('Password is required');
              }
            }}
          />
        </FormControl>
        <Button
          disabled={!username || !password}
          style={{ marginTop: '10px' }}
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSignIn}
        >
          SIGN IN
        </Button>
        <Button
          style={{ marginTop: '10px', backgroundColor: '#bdc3cc' }}
          fullWidth
          variant='contained'
        >
          <Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>
            Don't have an account?
          </Link>
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

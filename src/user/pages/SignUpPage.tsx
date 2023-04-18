import { Button, FormControl, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ServerController } from '../../api/server.controller';
import { useAuthValidatorContext } from '../components/AuthValidatorContext';

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

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    helperFName,
    helperLName,
    helperEmail,
    helperUser,
    helperPass,
    validateFName,
    validateLName,
    validateUsername,
    validatePassword,
    validateEmail,
    readyToSignUp,
  } = useAuthValidatorContext();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (readyToSignUp?.()) {
        const response = await ServerController.Authentication.signUp({
          firstName,
          lastName,
          email,
          username,
          password,
        });
        if (response.statusCode === 200) {
          navigate('/linksent');
        } else if (response.statusCode === 409) {
          setErrorMsg('User already exists');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create an account</h1>
        {errorMsg && <h3 style={{ color: 'red' }}>{errorMsg}</h3>}
        <FormControl fullWidth>
          <TextField
            required
            error={helperFName !== ''}
            label='First Name'
            placeholder='First Name'
            margin='dense'
            variant='outlined'
            helperText={helperFName}
            onChange={(e) => {
              if (validateFName?.(e.target.value)) {
                setFirstName(e.target.value);
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            error={helperLName !== ''}
            label='Last Name'
            placeholder='Last Name'
            margin='dense'
            variant='outlined'
            helperText={helperLName}
            onChange={(e) => {
              if (validateLName?.(e.target.value)) {
                setLastName(e.target.value);
              }
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            error={helperEmail !== ''}
            label='E-mail'
            placeholder='E-mail'
            margin='dense'
            variant='outlined'
            helperText={helperEmail}
            onChange={(e) => {
              if (validateEmail?.(e.target.value)) {
                setEmail(e.target.value);
              }
            }}
          />
        </FormControl>
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
              if (validateUsername?.(e.target.value)) {
                setUsername(e.target.value);
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
              if (validatePassword?.(e.target.value)) {
                setPassword(e.target.value);
              }
            }}
          />
        </FormControl>
        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSignUp}
        >
          SIGN UP
        </Button>
        <Button
          style={{ marginTop: '10px', backgroundColor: '#bdc3cc' }}
          fullWidth
          variant='contained'
        >
          <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>
            Already have an account?
          </Link>
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

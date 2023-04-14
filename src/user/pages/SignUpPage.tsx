import { Button, FormControl, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ServerController } from '../../api/server.controller';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [helperUser, setHelperUser] = useState('');
  const [helperPass, setHelperPass] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setHelperPass('Password must be longer than 8 characters.');
      return false;
    } else if (
      !/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)
    ) {
      setHelperPass(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter and one number OR special character.'
      );
      return false;
    }
    setHelperPass('');
    return true;
  };

  const validateUsername = (username: string) => {
    if (username.length < 4 || username.length > 20) {
      setHelperUser('Username must be between 4-20 characters long');
      return false;
    } else if (!/^(?=.*[a-zA-Z])([a-zA-Z0-9_.-]+)$/.test(username)) {
      setHelperUser(
        'Username must contain letters and can contain numbers, underscores (_), dots (.) and dashes (-)'
      );
      return false;
    }
    setHelperUser('');
    return true;
  };

  const handleSignUp = async () => {
    try {
      if (!helperPass && !helperUser && username && password) {
        const response = await ServerController.Authentication.signUp({
          username,
          password,
        });
        if (response.statusCode === 200) {
          navigate('/signin');
        } else if (response.statusCode === 409) {
          setHelperUser('Username already in use');
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
              if (validateUsername(e.target.value)) {
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
              if (validatePassword(e.target.value)) {
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

import { Button, FormControl, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import validUrl from 'valid-url';
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
  border-radius: 5px 5px 0 0;
  border: 2px solid #bdc3cc;
`;

const ResultContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #bdc3cc;
  padding: 30px;
  border-radius: 0 0 5px 5px;
  border: 2px solid #bdc3cc;
`;

export const NewUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [helperUrl, setHelperUrl] = useState('');

  const validate = (longUrl: string) => {
    if (longUrl.length === 0) {
      setHelperUrl('Please enter a URL');
      return false;
    } else if (!validUrl.isWebUri(longUrl)) {
      setHelperUrl('Invalid URL');
      return false;
    }

    setHelperUrl('');
    return true;
  };

  const shorten = async () => {
    if (!helperUrl) {
      const data = await ServerController.UrlShortener.getUrlShort(longUrl);
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>URL shortener</h1>
        <p>Enter your long URL:</p>
        <FormControl fullWidth>
          <TextField
            label='Long URL'
            error={helperUrl !== ''}
            placeholder='URL'
            margin='normal'
            variant='outlined'
            helperText={helperUrl}
            onChange={(e) => {
              if (validate(e.target.value)) {
                setLongUrl(e.target.value);
              }
            }}
          />
        </FormControl>
        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant='contained'
          color='primary'
          onClick={shorten}
        >
          SHORTEN
        </Button>
        <Link to='/urls'>
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant='contained'
            color='secondary'
          >
            GO BACK
          </Button>
        </Link>
      </FormContainer>
      {shortUrl && (
        <ResultContainer>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </ResultContainer>
      )}
    </FormWrapper>
  );
};

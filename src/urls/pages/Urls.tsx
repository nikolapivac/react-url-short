import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GetUrlsResponseDto } from '../../api/dto/get-urls-response.dto';
import { ServerController } from '../../api/server.controller';
import { useUserContext } from '../../user/components/UserContext';
import { UrlCard } from '../components/UrlCard';

const UrlWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
`;

const UrlHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const ShortenNewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const UrlContainer = styled.div`
  padding-top: 20px;
`;

export const Urls = () => {
  const [urls, setUrls] = useState<GetUrlsResponseDto[]>([]);

  const { username } = useUserContext();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await ServerController.GetAllUrls.getUrls();
        setUrls(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUrls();
  }, []);

  const renderUrls = () => {
    if (!urls.length) {
      return <h3>You haven't shortened any URLs</h3>;
    }

    return urls.map((url) => (
      <UrlCard
        key={url.code}
        code={url.code}
        longUrl={url.longUrl}
        shortUrl={url.shortUrl}
      />
    ));
  };

  return (
    <UrlWrapper>
      <UrlHeader>
        <h1>{username}'s URLs</h1>
        <ShortenNewContainer>
          <Link to='/shorten'>
            <Fab variant='extended' style={{ backgroundColor: '#bdc3cc' }}>
              <AddIcon />
              Shorten new URL
            </Fab>
          </Link>
        </ShortenNewContainer>
      </UrlHeader>
      <UrlContainer>{renderUrls()}</UrlContainer>
    </UrlWrapper>
  );
};

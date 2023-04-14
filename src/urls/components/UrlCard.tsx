import { Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { ServerController } from '../../api/server.controller';

const CardContainer = styled.div`
  margin-bottom: 20px;
  font-family: Roboto, sans-serif;
`;

const ShortUrl = styled.h1`
  font-size: 24px;
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LongUrlContainer = styled.div`
  font-size: 14px;
  font-weight: 300;
  width: 700px;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;

type Props = {
  key: string;
  code: string;
  longUrl: string;
  shortUrl: string;
};

export const UrlCard = (props: Props) => {
  const deleteUrl = async () => {
    try {
      await ServerController.DeleteUrl.deleteUrl(props.code);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer>
      <Card style={{ backgroundColor: '#edf4ff' }}>
        <CardContent>
          <CardHead>
            <a href={props.shortUrl}>
              <ShortUrl>{props.shortUrl}</ShortUrl>
            </a>
            <CardActions>
              <IconButton onClick={deleteUrl} style={{ color: '#8e9299' }}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </CardHead>
          <LongUrlContainer>
            <b>LongURL:</b> {props.longUrl}
          </LongUrlContainer>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

import { Button } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styled from 'styled-components';
import { ServerController } from '../api/server.controller';
import { useUserContext } from '../user/components/UserContext';

const HeaderContainer = styled.div`
  background-color: #bdc3cc;
  display: flex;
  justify-content: space-between;
  height: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Logo = styled.h1`
  font-size: 20px;
  align-items: center;
  margin-left: 12px;
  font-family: Roboto, sans-serif;
  letter-spacing: 2px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UsernameContainer = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
`;

export const Header = () => {
  const { username, logout, isLoggedIn } = useUserContext();

  const handleDeactivate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await ServerController.DeleteUser.deleteUser(token);
      logout?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderContainer>
      <Logo>URL SHORTENER</Logo>
      {isLoggedIn && (
        <Right>
          <UsernameContainer>{username}</UsernameContainer>
          <Button
            variant='outlined'
            style={{ backgroundColor: '#bdc3cc' }}
            onClick={logout}
          >
            <LogoutIcon style={{ marginRight: 6 }} />
            Log Out
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            style={{
              marginRight: 12,
            }}
            onClick={handleDeactivate}
          >
            <HighlightOffIcon style={{ marginRight: 6 }} />
            Deactivate
          </Button>
        </Right>
      )}
    </HeaderContainer>
  );
};

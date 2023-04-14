import { Button } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
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
  gap: 24px;
`;

const UsernameContainer = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
`;

export const Header = () => {
  const { username, logout, isLoggedIn } = useUserContext();

  return (
    <HeaderContainer>
      <Logo>URL SHORTENER</Logo>
      {isLoggedIn && (
        <Right>
          <UsernameContainer>{username}</UsernameContainer>
          <Button
            variant='outlined'
            style={{ backgroundColor: '#bdc3cc', marginRight: 12 }}
            onClick={logout}
          >
            <LogoutIcon />
            Log Out
          </Button>
        </Right>
      )}
    </HeaderContainer>
  );
};

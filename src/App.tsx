import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import { NewUrl } from './urls/pages/NewUrl';
import { Urls } from './urls/pages/Urls';
import { AuthValidatorContextProvider } from './user/components/AuthValidatorContext';
import { ProtectedRoute } from './user/components/ProtectedRoute';
import { LinkSentPage } from './user/pages/LinkSentPage';
import { SignInPage } from './user/pages/SignInPage';
import { SignUpPage } from './user/pages/SignUpPage';
import { VerifyEmailPage } from './user/pages/VerifyEmailPage';

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/signin/' element={<SignInPage />} />
        <Route
          path='/signup/'
          element={
            <AuthValidatorContextProvider>
              <SignUpPage />
            </AuthValidatorContextProvider>
          }
        />
        <Route path='/linksent/' element={<LinkSentPage />} />
        <Route path='/verify/:code' element={<VerifyEmailPage />} />
        <Route
          path='/urls'
          element={
            <ProtectedRoute>
              <Urls />
            </ProtectedRoute>
          }
        />
        <Route
          path='/shorten'
          element={
            <ProtectedRoute>
              <NewUrl />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

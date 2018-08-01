import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import { animated } from 'react-spring';

import { GoogleLogin } from 'react-google-login';
import { setLocalStorage } from '../auth';

import Button from '../components/Button';
import Google from '../icons/Google.svg';

const Page = styled(animated.div)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.background};
  justify-content: center;
  min-height: calc(100vh - 10px);
`;

const Title = styled(animated.h1)`
  font-size: 3.6rem;
  color: #222;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Disclaimer = styled(animated.p)`
  color: #666;
  line-height: 1.2;
  font-size: 1.6rem;
  margin-bottom: 60px;
`;

const SocialLoginButton = styled(Button)`
  position: relative;
  height: 60px;
  text-align: left;
  padding-left: 60px;

  > span {
    font-size: 1.8rem !important;
    color: #222;
    font-weight: 400;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  background: ${p => (p.cta ? p.theme.action : '#FFF')};
  padding: 20px 0;
  border: none;
  outline: none;
  position: relative;
  height: 60px;
  text-align: left;
  padding-left: 60px;
  font-family: ${p => p.theme.fonts.text};
  font-size: 1.8rem;
`;

class Login extends Component {
  state = {
    isSigningIn: false,
    success: false,
    redirectToReferrer: false,
    error: ''
  };

  onRequest = () => this.setState({ isSigningIn: true });

  handleSuccess = response => {
    const { profileObj, tokenId } = response;

    setLocalStorage(tokenId, profileObj);
    this.setState({ redirectToReferrer: true });
    this.props.history.push('/');
  };

  handleError = response => {
    this.setState({ error: response });
    this.setState({ isSigningIn: false });
  };

  render() {
    const { isSigningIn, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <animated.div style={this.props.style}>
        {isSigningIn ? (
          <CenterWrapper>LOGGAR IN</CenterWrapper>
        ) : (
          <Page /* style={this.props.style} */>
            <Title>Logga in</Title>
            <Disclaimer>
              Vi kommer aldrig att publicera något eller utföra annan aktivitet
              med ditt konto
            </Disclaimer>
            <StyledGoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID}
              onRequest={this.onRequest}
              onSuccess={this.handleSuccess}
              onFailure={this.handleError}
              buttonText={`Logga in med Google`}
            >
              <IconWrapper>
                <img src={Google} alt={`Logga in med Google`} />
              </IconWrapper>
              Logga in med Google
            </StyledGoogleLogin>
          </Page>
        )}
      </animated.div>
    );
  }
}

export default withRouter(Login);

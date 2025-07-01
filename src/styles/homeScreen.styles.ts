import styled from 'styled-components';

export const HomeScreenImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('/bingo-logo.png');
  background-size: 30%;
  background-position: left;
  z-index: -1;
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 375px;
  height: 80vh;
  padding: 22px;
  z-index: 1;
  background-color: rgb(39, 40, 102);
  opacity: 0.99;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 1);
  border-radius: 60px;

  @media (min-width: 646px) {
    max-width: 646px;
  }
`;

export const LimitedContainerFormLogin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 498px;
`;

export const HomeScreenContainerLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to right,
    rgb(218, 231, 255),
    rgb(132, 123, 254)
  );
  z-index: -2;
`;
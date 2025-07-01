'use client';

import { ButtonShadUI } from "@/components/Button";
import BingoSVGIcon from "@/components/icons/BingoSVGIcon";
import InputWithTitle from "@/components/InputWithTitle";
import { 
  HomeScreenImageBackground, 
  LimitedContainerFormLogin,
  HomeScreenContainerLogin,
  LoginContainer,
  GradientBackground
 } from "@/styles/homeScreen.styles";

export default function Home() {
  return (
    <>
      <GradientBackground />
      <HomeScreenImageBackground />
      <HomeScreenContainerLogin>
        <LoginContainer>
          <BingoSVGIcon fill="white" width={150} height={150}/>
          <LimitedContainerFormLogin>
            <InputWithTitle title="Nome" placeholder="Digite seu nome" />
          </LimitedContainerFormLogin>
          <ButtonShadUI>
            <a href="/game/1">Enter in game 1</a>
          </ButtonShadUI>
        </LoginContainer>
      </HomeScreenContainerLogin>
    </>
  );
}
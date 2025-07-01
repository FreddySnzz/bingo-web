'use client';

import { ButtonShadUI } from "@/components/Button";
import BingoSVGIcon from "@/components/icons/BingoSVGIcon";
import InputWithTitle from "@/components/InputWithTitle";
import { 
  HomeScreenImageBackground, 
  LimitedContainerFormLogin,
  HomeScreenContainer,
  LoginContainer,
  GradientBackground,
  LimitedContainerIcon,
  LoginContainerForm
 } from "@/styles/homeScreen.styles";
import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState('');

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <>
      <GradientBackground />
      <HomeScreenImageBackground />
      <HomeScreenContainer>
        <LoginContainer>
          <LoginContainerForm>
            <LimitedContainerIcon>
              <BingoSVGIcon fill="white" width={150} height={150}/>
            </LimitedContainerIcon>
            <LimitedContainerFormLogin>
              <InputWithTitle title="Nome:" placeholder="Digite seu nome" className="bg-white" value={userName} onChange={handleUserNameChange}/>
            </LimitedContainerFormLogin>
            <ButtonShadUI variant="default" size="lg" className="font-bold text-md mt-4">PROCURAR SALAS</ButtonShadUI>
          </LoginContainerForm>
        </LoginContainer>
      </HomeScreenContainer>
    </>
  );
}
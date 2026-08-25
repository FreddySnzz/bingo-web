'use client';

import { ButtonShadUI } from "@/components/Button";
import Footer from "@/components/Footer";
import BingoSVGIcon from "@/components/icons/BingoSVGIcon";
// import { ThemeToggle } from "@/components/ThemeToggle";
import CustomModal from "@/components/Modal";
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
//  import { useRouter } from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState('PROCURAR SALAS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const router = useRouter();

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSearch = () => {
    if (!userName) {
      alert('Por favor, digite um nickname.');
      return;
    };

    setIsLoading(true);
    setButtonText('PROCURANDO SALAS...');
    setIsModalOpen(true);
  };

  return (
    <>
      <GradientBackground />
      <HomeScreenImageBackground />
      <HomeScreenContainer>
        <LoginContainer>
          <LoginContainerForm>
            <LimitedContainerIcon>
              <BingoSVGIcon fill="#e0e0fd" width={150} height={150}/>
            </LimitedContainerIcon>
            <LimitedContainerFormLogin>
              <InputWithTitle className="bg-slate-100 text-black font-medium" title="Digite seu nickname:" placeholder="NicknameLegal789" value={userName} onChange={handleUserNameChange}/>
            </LimitedContainerFormLogin>
            <ButtonShadUI text={buttonText} variant="default" size="lg" className="font-bold text-md mt-4" onClick={handleSearch} isLoading={isLoading}/>

            <CustomModal isOpen={isModalOpen} onClose={() => {setIsLoading(false); setButtonText('PROCURAR SALAS'); setIsModalOpen(false)}}>
              {userName}
            </CustomModal>
          </LoginContainerForm>
        </LoginContainer>
      </HomeScreenContainer>
      <Footer />
    </>
  );
}
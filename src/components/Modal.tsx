"use client";

import { ButtonShadUI } from "./Button";
import { LoginContainer } from "@/styles/homeScreen.styles";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CustomModal({ 
  isOpen, 
  onClose, 
  children 
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-amber-500" onClick={onClose}>
      <LoginContainer onClick={(e) => e.stopPropagation()}>
        Olá, {children}!
        <ButtonShadUI text="FECHAR" variant="secondary" size="lg" className="font-bold text-md mt-4" onClick={onClose}/>
      </LoginContainer>
    </div>
  );
}

'use client';

import { Input as InputShadcn } from "@/components/ui/input"
import { 
  InputWithTitleContainer,
  LabelInputWithTitle,
  ContainerInput
 } from "@/styles/input-with-title.styles";
import UserSVGIcon from "./icons/UserSVGIcon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string; 
  placeholder?: string;
}

export default function Input({ title, placeholder, ...props }: InputProps) {
  return (
    <InputWithTitleContainer>
      <LabelInputWithTitle className="font-bold text-lg">{title}</LabelInputWithTitle>
      <ContainerInput>
        <UserSVGIcon fill="white"/>
        <InputShadcn placeholder={placeholder} {...props}/>
      </ContainerInput>
    </InputWithTitleContainer>
  );
};
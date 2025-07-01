'use client';

import { Input as InputShadcn } from "@/components/ui/input"
import { 
  InputWithTitleContainer,
  LabelInputWithTitle
 } from "@/styles/input-with-title.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string; 
  placeholder?: string;
}

export default function Input({ title, placeholder, ...props }: InputProps) {
  return (
    <InputWithTitleContainer>
      <LabelInputWithTitle>{title}</LabelInputWithTitle>
      <InputShadcn placeholder={placeholder} {...props}/>
    </InputWithTitleContainer>
  );
};
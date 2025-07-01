'use client';

import { FooterBackground } from "@/styles/footer.styles";

export default function Footer() {
  return (
    <FooterBackground className={"font-bold"}>
      <p>Copyright &copy; {new Date().getFullYear()} - All rights reserved</p>
      <div>
        <span>Desenvolvido por </span>
        <a href="https://github.com/FreddySnzz">FreddySnzz</a>
      </div>
    </FooterBackground>
  );
}
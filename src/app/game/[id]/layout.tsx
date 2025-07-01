import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <Link href="/">Inicio</Link>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

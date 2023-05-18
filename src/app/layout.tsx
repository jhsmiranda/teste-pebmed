import "./globals.css";
import { DM_Sans } from "next/font/google";
import Header from "~/components/Header";

const DMSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Portal de Assinatura PEBMED",
  description: "Página de escolha de plano e pagamento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={DMSans.className} suppressHydrationWarning={true}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}

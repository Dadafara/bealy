import "./globals.css";
import { StoreProvider } from "./StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property='og:locale' content="en" />
      <meta name='application-name' content='Hacker News' />
      <meta name='og:site_name' content='Hacker News' />
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

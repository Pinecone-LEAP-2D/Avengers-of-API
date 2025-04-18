import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "../../provider/QueryProvider";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./coffee-bean.png" />
        <title>BuymeaCoffee</title>
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

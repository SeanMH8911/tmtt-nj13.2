import "../styles/global.css";
import Nav from "./auth/Nav";

export const metadata = {
  title: "TMTT",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* @ts-expect-error Server Component  */}
        <Nav />
        {children}
      </body>
    </html>
  );
}

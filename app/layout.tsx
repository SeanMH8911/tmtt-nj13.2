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
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* @ts-expect-error Server Component  */}
        <Nav />
        {children}
      </body>
    </html>
  );
}

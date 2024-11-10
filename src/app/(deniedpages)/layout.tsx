import "@/src/app/globals.css";
export const metadata = {
  title: "Denied - ZPPSU DRMS",
  description: "Denied - ZPPSU DRMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

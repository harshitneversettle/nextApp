export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-auto flex flex-col h-auto`}>{children}</body>
    </html>
  );
}

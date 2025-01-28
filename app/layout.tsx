import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Meeting Room Booking',
  description: 'Created to make meeting room booking seamless',
  icons: {
    icon: '/logo.png', // Path to your favicon in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OneEarth 🌍',
  description:
    'A live interactive globe connecting people around the world in real-time.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Optional: preload globe textures for faster rendering */}
        <link rel="preload" as="image" href="/earth_daymap.jpg" />
        <link rel="preload" as="image" href="/earth_bump.jpg" />
        <link rel="preload" as="image" href="/earth_specular.jpg" />
      </head>
      <body className="bg-black text-white font-sans overflow-hidden w-screen h-screen">
        {children}
      </body>
    </html>
  );
}

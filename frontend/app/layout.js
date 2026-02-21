import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DormLink — Find Student Accommodation',
  description: 'Find verified student accommodation near your university in Tanzania',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000, // Fixed: Now disappears after 3 seconds
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                borderRadius: '10px',
                padding: '16px 24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                maxWidth: '460px',
              },
              error: {
                duration: 3000, // Fixed
                style: {
                  background: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                },
                iconTheme: {
                  primary: '#991b1b',
                  secondary: '#fee2e2',
                },
              },
              success: {
                duration: 3000, // Fixed
                style: {
                  background: '#dcfce7',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                },
                iconTheme: {
                  primary: '#166534',
                  secondary: '#dcfce7',
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'rgba(23, 31, 51, 0.9)',
          color: '#dae2fd',
          border: '1px solid rgba(71, 85, 105, 0.5)',
          borderRadius: '12px',
          backdropFilter: 'blur(12px)',
          fontFamily: 'Geist, sans-serif',
          fontSize: '14px',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#4edea3',
            secondary: '#0b1326',
          },
        },
        error: {
          iconTheme: {
            primary: '#ffb4ab',
            secondary: '#0b1326',
          },
        },
      }}
    />
  );
}

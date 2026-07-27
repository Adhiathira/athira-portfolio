import type { AppProps } from 'next/app';
import '../styles/tokens.css';
import '../styles/globals.css';
import { DemoModalProvider } from '@/components/common/DemoModalProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DemoModalProvider>
      <Component {...pageProps} />
    </DemoModalProvider>
  );
}

import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import SSRProvider from 'react-bootstrap/SSRProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <Component {...pageProps} />
  </SSRProvider>;
}
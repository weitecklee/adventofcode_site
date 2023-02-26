import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import SSRProvider from 'react-bootstrap/SSRProvider';
import TopBar from './topbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <TopBar />
    <Component {...pageProps} />
  </SSRProvider>;
}
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <a className="skip-to-content" href="#content">
        Skip to Content
      </a>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

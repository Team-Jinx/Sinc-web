import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";
import { GlobalStyle } from "src/styles/GlobalStyles";
import { TabBar } from "src/components/molecules";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <TabBar />
      </ThemeProvider>
    </>
  );
}
export default App;

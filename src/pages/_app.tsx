import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";
import { GlobalStyle } from "src/styles/GlobalStyles";
import { RecoilRoot } from "recoil";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--black)",
              position: "absolute",
              zIndex: -1,
            }}
          />
          {/* <PageTransition> */}
          <Component {...pageProps} />
          {/* </PageTransition> */}
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
export default App;

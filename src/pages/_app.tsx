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
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, "
        />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.js" />
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

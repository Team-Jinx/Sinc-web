import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";
import { GlobalStyle } from "src/styles/GlobalStyles";
import { TabBar } from "src/components/molecules";
import { RecoilRoot } from "recoil";
import { PageTransition } from "src/libs";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta />
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
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
          <TabBar />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
export default App;

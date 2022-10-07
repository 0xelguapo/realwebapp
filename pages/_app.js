import "regenerator-runtime/runtime";
import { AuthContextProvider } from "../shared/context/auth-context";
import "../styles/globals.css";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import nProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ClientContextProvider } from "../shared/context/client-context";
import { Provider } from "react-redux";
import store from "../shared/redux/index";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => nProgress.start());
    router.events.on("routeChangeComplete", () => nProgress.done());
    router.events.on("routeChangeError", () => nProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => nProgress.start());
      router.events.off("routeChangeComplete", () => nProgress.done());
      router.events.off("routeChangeError", () => nProgress.done());
    };
  }, [router]);

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <ClientContextProvider>
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ClientContextProvider>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;

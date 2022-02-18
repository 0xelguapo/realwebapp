import { AuthContextProvider } from "../shared/context/auth-context";
import "../styles/globals.css";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import nProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";

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
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;

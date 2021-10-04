import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo/apolloClient";
import NProgress from "nprogress"; //nprogress module
import Router from "next/router";

import "../styles/globals.css";
import "react-pro-sidebar/dist/css/styles.css";
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/react-nestable.css";

import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          <Layout>{page}</Layout>
        </ThemeProvider>
      </ApolloProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;

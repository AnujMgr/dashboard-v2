import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo/apolloClient";
import NProgress from "nprogress"; //nprogress module
import Router, { useRouter } from "next/router";

import "../styles/globals.css";
import "react-pro-sidebar/dist/css/styles.css";
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/react-nestable.css";

import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../utils/context/AuthContext";
import ProtectedRoute from "../lib/RouteProtection/ProtectedRoute";
import { appRoutes } from "../utils/constants";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  let unprotectedRoutes = [appRoutes.LOGIN_PAGE, appRoutes.REGISTER_PAGE];
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <AuthProvider>
        <ApolloProvider client={client}>
          <ThemeProvider attribute="class">
            {/* <AuthCheck> */}
            <ProtectedRoute router={router} pathIsProtected={pathIsProtected}>
              {!pathIsProtected ? <div>{page}</div> : <Layout>{page}</Layout>}
            </ProtectedRoute>
            {/* </AuthCheck> */}
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;

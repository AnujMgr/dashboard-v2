import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useAuth } from "../../utils/context/AuthContext";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children, pathIsProtected }) => {
  //Identify authenticated user
  // const authContext = useContext(AuthContext);
  const [state] = useAuth();
  const { accessToken, loading } = state;
  const isAuthenticated = accessToken ? true : false;

  // let unprotectedRoutes = [appRoutes.LOGIN_PAGE];

  // /**
  //  * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
  //  */
  // let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  useEffect(() => {
    if (!loading && !isAuthenticated && pathIsProtected) {
      console.log("Sdf");

      // Redirect route, you can point this to /login
      router.push("/login");
    }
  }, [loading, accessToken, pathIsProtected]);

  if ((loading || !isAuthenticated) && pathIsProtected) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoute;

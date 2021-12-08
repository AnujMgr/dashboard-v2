import { appRoutes } from "../constants";
import { useAuthContext } from "../contexts";

const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.FORGOT_PASSWORD,
    appRoutes.RESET_PASSWORD,
    appRoutes.EMAIL_SENT,
    appRoutes.VERIFY_EMAIL,
    appRoutes.NEWS_FEED_PAGE,
    appRoutes.CONTENT_DETAILS_PAGE,
    appRoutes.ABOUT_US_PAGE,
  ];

  return children;
};

export default ProtectedRoute;

import { useRouter } from "next/router";
import { useAuth } from "../../utils/context/AuthContext";

const withAuth = (Component) => {
  const Auth = (props) => {
    const [state] = useAuth();
    const { accessToken } = state;

    const router = useRouter();
    if (accessToken !== null) {
      return <Component {...props} />;
    } else {
      router.replace("/login");
      return null;
    }
  };
  return Auth;
};

export default withAuth;

//Source : https://jaygould.co.uk/2020-01-31-nextjs-auth-jwt-context-hooks/
//Source: https://dev.to/antonm7/nextjs-auth-with-prisma-and-refresh-tokens-jwt-5he1
//Source: https://azeezatraheem.medium.com/implementing-authentication-redirects-in-next-js-c15907ec82b7
//Source :https://medium.com/swlh/jwt-json-web-tokens-user-authentication-in-next-js-web-application-51deab8f2e96

import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import Spinner from "../../components/Spinner/Spinner";
import { refreshToken } from "../../lib/functions/auth";

export const AuthContext = createContext({});

const initialState = { accessToken: null, user: {}, loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "setAuthDetails":
      return {
        user: action.payload.user,
        loading: false,
      };
    case "removeAuthDetails":
      return {
        user: initialState.user,
        loading: false,
      };
    case "setAccessToken":
      return {
        accessToken: action.payload.accessToken,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// create and export the AuthProvider - this is imported to the _app.js file
// and wrapped around the whole app, providing context to the whole app, and
// is called each time this specific context is accessed (updated or retrieved)
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //initial funciton
    refreshToken().then((data) => {
      if (data.ok) {
        dispatch({
          type: "setAuthDetails",
          payload: {
            user: data.payload,
            loading: false,
          },
        });

        dispatch({
          type: "setAccessToken",
          payload: {
            accessToken: data.accessToken,
          },
        });
      }
      setLoading(false);
    });

    //starts silent refreshes countdown
    setInterval(() => {
      refreshToken().then((data) => {
        if (data.ok) {
          dispatch({
            type: "setAuthDetails",
            payload: {
              user: data.payload,
            },
          });

          dispatch({
            type: "setAccessToken",
            payload: {
              accessToken: data.accessToken,
            },
          });
        }
      });
    }, 600000);
  }, []);

  if (loading) return <Spinner />;

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

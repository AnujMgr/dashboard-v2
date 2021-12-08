import { useAuth } from "../utils/context/AuthContext";
import checkAuthClient from "../lib/functions/checkAuthClient";
import useSWR from "swr";

function Home() {
  const [state, dispatch] = useAuth();
  const { accessToken } = state;

  const url = "/api/companies";

  const fetcher = async () => {
    return await fetch("/api/companies", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  };

  const { data, error } = useSWR("/api", fetcher);
  console.log(data);

  function logOut() {
    fetch("/api/signOut", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      dispatch({
        type: "setAuthDetails",
        payload: {
          user: {},
        },
      });

      dispatch({
        type: "setAccessToken",
        payload: {
          accessToken: null,
        },
      });
    });
  }

  return (
    <div>
      <h1 className="text-xs text-white">Home</h1>
      <button
        className="px-4 py-2 rounded bg-blue-800 text-white"
        onClick={logOut}
      >
        {" "}
        Logout
      </button>
    </div>
  );
}

export default checkAuthClient(Home);

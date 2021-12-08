import { useEffect, useState } from "react";
import useSWR from "swr";
import checkAuthClient from "../lib/functions/checkAuthClient";
import { useAuth } from "../utils/context/AuthContext";

function Protected() {
  const [secret, setSecret] = useState(null);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useAuth();

  const fetcher = async () => {
    return await fetch("/api/protectedRoute", {
      headers: {
        authorization: `Bearer ${state.accessToken}`,
      },
    });
  };

  const { data, error } = useSWR("/api/", fetcher);
  console.log(data);

  useEffect(() => {
    if (data) setSecret(data.data);
    if (error) setError(error);
    setLoading(false);
  }, [data, error]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (isError) {
      return <div>YO! YOU ARE NOT AUTHENTICATED,GET AWAY FROM HERE!!!</div>;
    } else {
      return <div>Welcome to protected Page, {secret}</div>;
    }
  }
}

export default checkAuthClient(Protected);

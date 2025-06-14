import { verify } from "jsonwebtoken";

const checkAuth = (handler) => {
  return async (req, res) => {
    try {
      const authorization = req.headers["authorization"];
      if (!authorization) throw new Error("not authenticated");

      const token = authorization.split(" ")[1];

      verify(token, process.env.ACCESS_TOKEN_SECRET);

      return handler(req, res);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "error",
        message: "Unauthorized Access!!",
      });
      // throw new Error(`You are not authorized in this route.`);
    }
  };
};

export default checkAuth;

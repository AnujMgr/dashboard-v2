import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../lib/functions/auth";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);
    const user = await Prisma.user.findUnique({
      where: {
        email,
      },
    });

    const userForTheClient = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    if (user) {
      const userPassword = user.password;

      bcrypt.compare(password, userPassword).then((isMatch) => {
        /* User matched */
        if (isMatch) {
          /* Create JWT Payload */
          sendRefreshToken(res, createRefreshToken(user));
          const accessToken = createAccessToken(user);

          return res.send({ ok: true, accessToken, user });
        } else {
          /* Send error with message */
          res.status(400).json({
            status: "error",
            error: "Password incorrect",
            accessToken: "",
          });
        }
      });
      const token = createRefreshToken(user);
      sendRefreshToken(res, token);
      const accessToken = createAccessToken(user);
      res.send({ user: userForTheClient, accessToken });
    } else {
      res.status(404).send();
    }
  }
};

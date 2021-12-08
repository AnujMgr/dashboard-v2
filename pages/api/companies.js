// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/client";
import checkAuth from "./middleware/checkAuthServer";

const companies = async (req, res) => {
  console.log("--------------------------");

  if (req.method === "GET") {
    const companies = await prisma.company.findMany({});
    res.json(companies);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
};

export default checkAuth(companies);

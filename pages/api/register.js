// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/client";

const Register = async (req, res) => {
  console.log("--------------------------");

  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data);

    // const companies = await prisma.company.findMany({});
    res.json(companies);
  } else {
    res.json({ message: "Method Not Alowed" });
    // throw new Error(
    //   `The HTTP ${req.method} method is not supported at this route.`
    // );
  }
};

export default Register;

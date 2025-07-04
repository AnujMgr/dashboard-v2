import { ApolloServer, gql } from "apollo-server-micro";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = { api: { bodyParser: false } };

export default handler;

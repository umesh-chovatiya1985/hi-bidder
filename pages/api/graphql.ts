import { ApolloServer, gql } from 'apollo-server-micro';
import { userTypeDefs } from './graphql/Users/UserTypeDefs';
import { userResolvers } from './graphql/Users/UserResolver';
import Cors from 'micro-cors';
import { categoryTypeDefs } from './graphql/Category/CategoryTypeDefs';
import { categoryResolvers } from './graphql/Category/CategoryResolvers';
import _ from 'lodash';
import { connect } from '../../utils/connection';

const cors = Cors();

const baseTypeDefs = gql`
  type Query
`
const apolloServer = new ApolloServer(
  { 
    typeDefs: [baseTypeDefs, userTypeDefs, categoryTypeDefs], 
    resolvers: _.merge({}, userResolvers, categoryResolvers),
    introspection: process.env.NODE_ENV !== 'production'
  });

const startServer = apolloServer.start();

export default cors(async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await connect();
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
});

export const config = {
  api: {
    bodyParser: false,
  },
}
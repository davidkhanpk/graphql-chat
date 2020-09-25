const { ApolloServer, gql } = require('apollo-server');
const { sequelize } = require('./models')
require('dotenv').config()

// The GraphQL schema
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
// const contextMiddleware = require('./utils/contextMiddleware')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: contextMiddleware,
  subscriptions: { path: '/'}
});

server.listen().then(({ url, subUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscription ready at ${subUrl}`);
  sequelize.authenticate().then(() => {
      console.log("Database Connected");
  }).catch()
});
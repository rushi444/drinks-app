const { GraphQLServer } = require('graphql-yoga');

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));

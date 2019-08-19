const { ApolloServer, gql } = require("apollo-server-lambda");
const fetch = require("node-fetch");

const typeDefs = gql`
  type Query {
    hello: String
    todo: TodoItem!
  }

  type TodoItem {
    id: ID!
    userId: Int!
    title: String!
    completed: Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return `Hello from Netlify function. https://bit.ly/2UXh0fD`;
    },
    todo: async (root, args, context) => {
      return await fetch("https://jsonplaceholder.typicode.com/todos/1").json();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();

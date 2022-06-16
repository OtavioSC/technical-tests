"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
  input BookInput {
    name: String!
    email: String!
    author: ID!
  }

  type Book {
    id: ID!
    name: String!
    email: String!
    author: Author!
  }

  input AuthorInput {
    name: String!
    age: Int!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
  }

  type Mutation {
    createBook(book: BookInput): Book
    deleteBook(id: ID!): ID!
    createAuthor(author: AuthorInput): Author
    deleteAuthor(id: ID!): ID!
  }

  type Query{
    getBook(id: ID!): Book
    getBooks: [Book]
    getAuthor(id: ID!): Author
    getAuthors: [Author]
  }
`);

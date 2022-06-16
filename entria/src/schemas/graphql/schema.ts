import { buildSchema } from "graphql";

export const schema = buildSchema(`
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
`)

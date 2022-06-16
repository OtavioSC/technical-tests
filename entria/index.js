"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const graphql_helix_1 = require("graphql-helix");
const schema_1 = require("./src/schemas/graphql/schema");
const server = new koa_1.default();
server.use((0, koa_bodyparser_1.default)());
server.use(async (ctx) => {
    const request = {
        body: ctx.request.body,
        headers: ctx.request.headers,
        method: ctx.request.method,
        query: ctx.request.query
    };
    if ((0, graphql_helix_1.shouldRenderGraphiQL)(request)) {
        ctx.body = (0, graphql_helix_1.renderGraphiQL)({});
    }
    else {
        const { operationName, query, variables } = (0, graphql_helix_1.getGraphQLParameters)(request);
        const result = await (0, graphql_helix_1.processRequest)({
            operationName,
            query,
            variables,
            request,
            schema: schema_1.schema,
        });
        ctx.respond = false;
        (0, graphql_helix_1.sendResult)(result, ctx.res);
    }
});
const port = process.env.PORT || 4001;
server.listen(port, () => {
    console.log(`Graphql Server Running on port ${port}`);
});

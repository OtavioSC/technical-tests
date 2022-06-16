import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import { schema } from './src/schemas/graphql/schema'

declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
  }
}

const server = new Koa();
server.use(bodyParser())

server.use(async (ctx) => {
  const request = {
    body: ctx.request.body,
    headers: ctx.request.headers,
    method: ctx.request.method,
    query: ctx.request.query
  }

  if(shouldRenderGraphiQL(request)){
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
})

const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log(`Graphql Server Running on port ${port}`)
})
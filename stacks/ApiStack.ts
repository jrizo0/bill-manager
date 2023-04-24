import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { billsTable } = use(StorageStack)

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [billsTable],
      },
    },
    routes: {
      "POST /bills": "packages/functions/src/bills/create.main",
      "GET /bills/{id}": "packages/functions/src/bills/get.main",
      "GET /bills": "packages/functions/src/bills/list.main",
      "PUT /bills/{id}": "packages/functions/src/bills/update.main",
      "DELETE /bills/{id}": "packages/functions/src/bills/delete.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}

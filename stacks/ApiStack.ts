import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { tableBills, tablePayments } = use(StorageStack)

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [tableBills, tablePayments],
      },
    },
    routes: {
      //- BILLS
      "POST /bills": "packages/functions/src/bills/create.main",
      "GET /bills/{id}": "packages/functions/src/bills/get.main",
      "GET /bills": "packages/functions/src/bills/list.main",
      "DELETE /bills/{id}": "packages/functions/src/bills/delete.main",
      // "PUT /bills/{id}": "packages/functions/src/bills/update.main",

      //- PAYMENTS
      "POST /payments/{id}": "packages/functions/src/payments/create.main",
      "GET /payments/{id}/{month}": "packages/functions/src/payments/get.main",
      "GET /payments/{id}": "packages/functions/src/payments/list.main",
      "DELETE /payments": "packages/functions/src/payments/delete.main",
      // update?
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}

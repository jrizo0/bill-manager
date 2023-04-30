import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "bill-manager",
      region: "us-east-1",
    };

  },
  stacks(app) {
    if (!["prod", "stage"].includes(app.stage))
      app.setDefaultRemovalPolicy("destroy")
    app.stack(StorageStack);
    app.stack(ApiStack);
  }
} satisfies SSTConfig;

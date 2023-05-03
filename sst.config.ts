import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { FrontendStack } from "./stacks/FrontendStack";

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
    app
      .stack(StorageStack)
      .stack(ApiStack)
      .stack(FrontendStack)
  }
} satisfies SSTConfig;

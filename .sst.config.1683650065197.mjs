import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ApiStack.ts
import { Api, use } from "sst/constructs";

// stacks/StorageStack.ts
import { Table } from "sst/constructs";
function StorageStack({ stack, app }) {
  const tableBills = new Table(stack, "Bills", {
    fields: {
      userID: "string",
      billID: "string",
      tag: "string",
      paymentWeb: "string",
      expirationDay: "number",
      reference: "string",
      created: "string"
    },
    primaryIndex: { partitionKey: "userID", sortKey: "billID" }
  });
  const tablePayments = new Table(stack, "Payments", {
    fields: {
      billID: "string",
      month: "number",
      year: "number",
      created: "string"
    },
    primaryIndex: { partitionKey: "billID", sortKey: "month" }
  });
  return {
    tableBills,
    tablePayments
  };
}
__name(StorageStack, "StorageStack");

// stacks/ApiStack.ts
function ApiStack({ stack }) {
  const { tableBills, tablePayments } = use(StorageStack);
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [tableBills, tablePayments]
      }
    },
    routes: {
      "POST /bills": "packages/functions/src/bills/create.main",
      "GET /bills/{id}": "packages/functions/src/bills/get.main",
      "GET /bills": "packages/functions/src/bills/list.main",
      "DELETE /bills/{id}": "packages/functions/src/bills/delete.main",
      "POST /payments/{id}": "packages/functions/src/payments/create.main",
      "GET /payments/{id}/{month}": "packages/functions/src/payments/get.main",
      "GET /payments/{id}": "packages/functions/src/payments/list.main",
      "DELETE /payments": "packages/functions/src/payments/delete.main"
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
  return {
    api
  };
}
__name(ApiStack, "ApiStack");

// stacks/FrontendStack.ts
import { NextjsSite, use as use2 } from "sst/constructs";
function FrontendStack({ stack, app }) {
  const { api } = use2(ApiStack);
  const site = new NextjsSite(stack, "Site", {
    path: "packages/web",
    environment: {
      NEXT_PUBLIC_API_URL: api.customDomainUrl || api.url,
      NEXT_PUBLIC_REGION: app.region
    }
  });
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000"
  });
}
__name(FrontendStack, "FrontendStack");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "bill-manager",
      region: "us-east-1"
    };
  },
  stacks(app) {
    if (!["prod", "stage"].includes(app.stage))
      app.setDefaultRemovalPolicy("destroy");
    app.stack(StorageStack).stack(ApiStack).stack(FrontendStack);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaVN0YWNrLnRzIiwgInN0YWNrcy9TdG9yYWdlU3RhY2sudHMiLCAic3RhY2tzL0Zyb250ZW5kU3RhY2sudHMiLCAic3N0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgU3RhY2tDb250ZXh0LCBBcGksIHVzZSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgU3RvcmFnZVN0YWNrIH0gZnJvbSBcIi4vU3RvcmFnZVN0YWNrXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlTdGFjayh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCB7IHRhYmxlQmlsbHMsIHRhYmxlUGF5bWVudHMgfSA9IHVzZShTdG9yYWdlU3RhY2spXG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaShzdGFjaywgXCJBcGlcIiwge1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICBmdW5jdGlvbjoge1xuICAgICAgICAvLyBCaW5kIHRoZSB0YWJsZSBuYW1lIHRvIG91ciBBUElcbiAgICAgICAgYmluZDogW3RhYmxlQmlsbHMsIHRhYmxlUGF5bWVudHNdLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvdXRlczoge1xuICAgICAgLy8tIEJJTExTXG4gICAgICBcIlBPU1QgL2JpbGxzXCI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9iaWxscy9jcmVhdGUubWFpblwiLFxuICAgICAgXCJHRVQgL2JpbGxzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2JpbGxzL2dldC5tYWluXCIsXG4gICAgICBcIkdFVCAvYmlsbHNcIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2JpbGxzL2xpc3QubWFpblwiLFxuICAgICAgXCJERUxFVEUgL2JpbGxzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL2JpbGxzL2RlbGV0ZS5tYWluXCIsXG4gICAgICAvLyBcIlBVVCAvYmlsbHMve2lkfVwiOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvYmlsbHMvdXBkYXRlLm1haW5cIixcblxuICAgICAgLy8tIFBBWU1FTlRTXG4gICAgICBcIlBPU1QgL3BheW1lbnRzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL3BheW1lbnRzL2NyZWF0ZS5tYWluXCIsXG4gICAgICBcIkdFVCAvcGF5bWVudHMve2lkfS97bW9udGh9XCI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9wYXltZW50cy9nZXQubWFpblwiLFxuICAgICAgXCJHRVQgL3BheW1lbnRzL3tpZH1cIjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvc3JjL3BheW1lbnRzL2xpc3QubWFpblwiLFxuICAgICAgXCJERUxFVEUgL3BheW1lbnRzXCI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9wYXltZW50cy9kZWxldGUubWFpblwiLFxuICAgICAgLy8gdXBkYXRlP1xuICAgIH0sXG4gIH0pO1xuXG4gIHN0YWNrLmFkZE91dHB1dHMoe1xuICAgIEFwaUVuZHBvaW50OiBhcGkudXJsLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGFwaSxcbiAgfVxufVxuIiwgImltcG9ydCB7IEJ1Y2tldCwgU3RhY2tDb250ZXh0LCBUYWJsZSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFN0b3JhZ2VTdGFjayh7IHN0YWNrLCBhcHAgfTogU3RhY2tDb250ZXh0KSB7XHJcbiAgY29uc3QgdGFibGVCaWxscyA9IG5ldyBUYWJsZShzdGFjaywgXCJCaWxsc1wiLCB7XHJcbiAgICBmaWVsZHM6IHtcclxuICAgICAgdXNlcklEOiBcInN0cmluZ1wiLFxyXG4gICAgICBiaWxsSUQ6IFwic3RyaW5nXCIsXHJcbiAgICAgIHRhZzogXCJzdHJpbmdcIixcclxuICAgICAgcGF5bWVudFdlYjogXCJzdHJpbmdcIixcclxuICAgICAgZXhwaXJhdGlvbkRheTogXCJudW1iZXJcIixcclxuICAgICAgcmVmZXJlbmNlOiBcInN0cmluZ1wiLFxyXG4gICAgICBjcmVhdGVkOiBcInN0cmluZ1wiLFxyXG4gICAgfSxcclxuICAgIHByaW1hcnlJbmRleDogeyBwYXJ0aXRpb25LZXk6IFwidXNlcklEXCIsIHNvcnRLZXk6IFwiYmlsbElEXCIgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdGFibGVQYXltZW50cyA9IG5ldyBUYWJsZShzdGFjaywgXCJQYXltZW50c1wiLCB7XHJcbiAgICBmaWVsZHM6IHtcclxuICAgICAgYmlsbElEOiBcInN0cmluZ1wiLFxyXG4gICAgICBtb250aDogXCJudW1iZXJcIixcclxuICAgICAgeWVhcjogXCJudW1iZXJcIixcclxuICAgICAgY3JlYXRlZDogXCJzdHJpbmdcIixcclxuICAgIH0sXHJcbiAgICBwcmltYXJ5SW5kZXg6IHsgcGFydGl0aW9uS2V5OiBcImJpbGxJRFwiLCBzb3J0S2V5OiBcIm1vbnRoXCIgfSxcclxuICB9KVxyXG5cclxuICAvL1RPRE86IGVuaGFuY2VtZW50IHVwbG9hZHM6XHJcbiAgLy8gY29uc3QgYnVja2V0ID0gbmV3IEJ1Y2tldChzdGFjaywgXCJVcGxvYWRzXCIsIHtcclxuICAvLyAgIGNvcnM6IFtcclxuICAvLyAgICAge1xyXG4gIC8vICAgICAgIG1heEFnZTogXCIxIGRheVwiLFxyXG4gIC8vICAgICAgIGFsbG93ZWRPcmlnaW5zOiBbXCIqXCJdLFxyXG4gIC8vICAgICAgIGFsbG93ZWRIZWFkZXJzOiBbXCIqXCJdLFxyXG4gIC8vICAgICAgIGFsbG93ZWRNZXRob2RzOiBbXCJHRVRcIiwgXCJQVVRcIiwgXCJQT1NUXCIsIFwiREVMRVRFXCIsIFwiSEVBRFwiXSxcclxuICAvLyAgICAgfSxcclxuICAvLyAgIF0sXHJcbiAgLy8gfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0YWJsZUJpbGxzOiB0YWJsZUJpbGxzLFxyXG4gICAgdGFibGVQYXltZW50czogdGFibGVQYXltZW50cyxcclxuICB9O1xyXG59XHJcbiIsICJpbXBvcnQgeyBOZXh0anNTaXRlLCBTdGFja0NvbnRleHQsIHVzZSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xyXG5pbXBvcnQgeyBBcGlTdGFjayB9IGZyb20gXCIuL0FwaVN0YWNrXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRnJvbnRlbmRTdGFjayh7IHN0YWNrLCBhcHAgfTogU3RhY2tDb250ZXh0KSB7XHJcbiAgY29uc3QgeyBhcGkgfSA9IHVzZShBcGlTdGFjayk7XHJcblxyXG4gIC8vIERlZmluZSBvdXIgUmVhY3QgYXBwIFxyXG4gIGNvbnN0IHNpdGUgPSBuZXcgTmV4dGpzU2l0ZShzdGFjaywgXCJTaXRlXCIsIHtcclxuICAgIHBhdGg6IFwicGFja2FnZXMvd2ViXCIsXHJcbiAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICBORVhUX1BVQkxJQ19BUElfVVJMOiBhcGkuY3VzdG9tRG9tYWluVXJsIHx8IGFwaS51cmwsXHJcbiAgICAgIE5FWFRfUFVCTElDX1JFR0lPTjogYXBwLnJlZ2lvbixcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIFNob3cgdGhlIHVybCBpbiB0aGUgb3V0cHV0XHJcbiAgc3RhY2suYWRkT3V0cHV0cyh7XHJcbiAgICBTaXRlVXJsOiBzaXRlLnVybCB8fCBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiLFxyXG4gIH0pO1xyXG59XHJcbiIsICJpbXBvcnQgeyBTU1RDb25maWcgfSBmcm9tIFwic3N0XCI7XG5pbXBvcnQgeyBBcGlTdGFjayB9IGZyb20gXCIuL3N0YWNrcy9BcGlTdGFja1wiO1xuaW1wb3J0IHsgU3RvcmFnZVN0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL1N0b3JhZ2VTdGFja1wiO1xuaW1wb3J0IHsgRnJvbnRlbmRTdGFjayB9IGZyb20gXCIuL3N0YWNrcy9Gcm9udGVuZFN0YWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnKF9pbnB1dCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBcImJpbGwtbWFuYWdlclwiLFxuICAgICAgcmVnaW9uOiBcInVzLWVhc3QtMVwiLFxuICAgIH07XG5cbiAgfSxcbiAgc3RhY2tzKGFwcCkge1xuICAgIGlmICghW1wicHJvZFwiLCBcInN0YWdlXCJdLmluY2x1ZGVzKGFwcC5zdGFnZSkpXG4gICAgICBhcHAuc2V0RGVmYXVsdFJlbW92YWxQb2xpY3koXCJkZXN0cm95XCIpXG4gICAgYXBwXG4gICAgICAuc3RhY2soU3RvcmFnZVN0YWNrKVxuICAgICAgLnN0YWNrKEFwaVN0YWNrKVxuICAgICAgLnN0YWNrKEZyb250ZW5kU3RhY2spXG4gIH1cbn0gc2F0aXNmaWVzIFNTVENvbmZpZztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7O0FBQUEsU0FBdUIsS0FBSyxXQUFXOzs7QUNBdkMsU0FBK0IsYUFBYTtBQUVyQyxTQUFTLGFBQWEsRUFBRSxPQUFPLElBQUksR0FBaUI7QUFDekQsUUFBTSxhQUFhLElBQUksTUFBTSxPQUFPLFNBQVM7QUFBQSxJQUMzQyxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxZQUFZO0FBQUEsTUFDWixlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsY0FBYyxFQUFFLGNBQWMsVUFBVSxTQUFTLFNBQVM7QUFBQSxFQUM1RCxDQUFDO0FBRUQsUUFBTSxnQkFBZ0IsSUFBSSxNQUFNLE9BQU8sWUFBWTtBQUFBLElBQ2pELFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxjQUFjLEVBQUUsY0FBYyxVQUFVLFNBQVMsUUFBUTtBQUFBLEVBQzNELENBQUM7QUFjRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUF4Q2dCOzs7QURDVCxTQUFTLFNBQVMsRUFBRSxNQUFNLEdBQWlCO0FBQ2hELFFBQU0sRUFBRSxZQUFZLGNBQWMsSUFBSSxJQUFJLFlBQVk7QUFFdEQsUUFBTSxNQUFNLElBQUksSUFBSSxPQUFPLE9BQU87QUFBQSxJQUNoQyxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsUUFFUixNQUFNLENBQUMsWUFBWSxhQUFhO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFFTixlQUFlO0FBQUEsTUFDZixtQkFBbUI7QUFBQSxNQUNuQixjQUFjO0FBQUEsTUFDZCxzQkFBc0I7QUFBQSxNQUl0Qix1QkFBdUI7QUFBQSxNQUN2Qiw4QkFBOEI7QUFBQSxNQUM5QixzQkFBc0I7QUFBQSxNQUN0QixvQkFBb0I7QUFBQSxJQUV0QjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVztBQUFBLElBQ2YsYUFBYSxJQUFJO0FBQUEsRUFDbkIsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGO0FBbENnQjs7O0FFSGhCLFNBQVMsWUFBMEIsT0FBQUEsWUFBVztBQUd2QyxTQUFTLGNBQWMsRUFBRSxPQUFPLElBQUksR0FBaUI7QUFDMUQsUUFBTSxFQUFFLElBQUksSUFBSUMsS0FBSSxRQUFRO0FBRzVCLFFBQU0sT0FBTyxJQUFJLFdBQVcsT0FBTyxRQUFRO0FBQUEsSUFDekMsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLE1BQ1gscUJBQXFCLElBQUksbUJBQW1CLElBQUk7QUFBQSxNQUNoRCxvQkFBb0IsSUFBSTtBQUFBLElBQzFCO0FBQUEsRUFDRixDQUFDO0FBR0QsUUFBTSxXQUFXO0FBQUEsSUFDZixTQUFTLEtBQUssT0FBTztBQUFBLEVBQ3ZCLENBQUM7QUFDSDtBQWhCZ0I7OztBQ0VoQixJQUFPLHFCQUFRO0FBQUEsRUFDYixPQUFPLFFBQVE7QUFDYixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsSUFDVjtBQUFBLEVBRUY7QUFBQSxFQUNBLE9BQU8sS0FBSztBQUNWLFFBQUksQ0FBQyxDQUFDLFFBQVEsT0FBTyxFQUFFLFNBQVMsSUFBSSxLQUFLO0FBQ3ZDLFVBQUksd0JBQXdCLFNBQVM7QUFDdkMsUUFDRyxNQUFNLFlBQVksRUFDbEIsTUFBTSxRQUFRLEVBQ2QsTUFBTSxhQUFhO0FBQUEsRUFDeEI7QUFDRjsiLAogICJuYW1lcyI6IFsidXNlIiwgInVzZSJdCn0K

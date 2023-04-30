import { Bill } from "@bill-manager/core/bill";
import handler from "src/handler";

export const main = handler(async (event: any) => {
  const params = {
    userID: "1",
    billID: event.pathParameters.id
  }
  const result = await Bill.get(params)

  if (!result) {
    throw new Error("Item not found.");
  }
  return result
});

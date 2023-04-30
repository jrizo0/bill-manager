import { Payment } from "@bill-manager/core/payment";
import handler from "../handler";

export const main = handler(async (event: any) => {
  const params = {
    billID: event.pathParameters.id,
  }

  const result = await Payment.list(params)

  return result
});


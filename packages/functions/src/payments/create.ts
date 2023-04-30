import handler from "../handler";
import { Payment } from "@bill-manager/core/payment";

export const main = handler(async (event: any) => {
  const params = {
    billID: event.pathParameters.id,
    // created: newDate(2023, 2, 10).toISOString()
    created: new Date().toISOString()
  };

  const result = await Payment.create(params)

  return result
});

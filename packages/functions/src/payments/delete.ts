import { Payment } from "@bill-manager/core/payment";
import handler from "../handler";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);

  console.log(data)
  const params = {
    billID: data.billID,
    month: Number(data.month),
  };

  const result = await Payment.remove(params)

  return result
});

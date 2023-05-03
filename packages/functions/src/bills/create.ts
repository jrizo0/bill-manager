import { Bill } from "@bill-manager/core/bill";
import handler from "src/handler";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);

  const params = {
    tag: data.tag,
    paymentWeb: data.paymentWeb,
    expirationDay: Number(data.expirationDay),
    reference: data.reference,
  }
  const result = await Bill.create(params)

  return result
});

import { restApiClient } from ".";

//Order Status Listings
export const fetchOrderStatus = (
  statusType,
  eventName,
  eventId,
  invoiceId,
  eventAddress,
  startDate,
  endDate,
  page,
  limit
) => {
  return restApiClient.get(`/getOrderStatus`, {
    params: {
      status: statusType,
      eventName: eventName,
      eventId: eventId,
      invoiceId: invoiceId,
      eventAddress: eventAddress,
      startDate: startDate,
      endDate: endDate,
      page: page,
      limit: limit
    }
  });
};

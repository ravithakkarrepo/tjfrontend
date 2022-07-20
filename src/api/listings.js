/* eslint-disable eqeqeq */
import qs from "qs";

import { restApiClient, emailScrapingClient } from ".";

export const publishListing = (eventId, listing) => {
  if (!listing || !eventId) return;

  return restApiClient.post(`/events/${eventId}/publishListing`, listing);
};

export const fetchValidListings = (eventId, stubhubEventId = undefined) => {
  if (!eventId) return;

  return stubhubEventId
    ? restApiClient.get(`/validPostings/${eventId}`, {
        params: {
          stubhubEventId,
          useSpread: true
        }
      })
    : restApiClient.get(`/validPostings/${eventId}`);
};

export const fetchTrackedListings = eventId => {
  if (!eventId) return;

  return restApiClient.get(`/event/${eventId}/trackedListings`);
};

// For testing sold listing on dev env
export const fetchSimulateTrackedListings = () => {
  return restApiClient.get(`/getAllTrackedListings`);
};

export const fetchSoldListings = eventId => {
  if (!eventId) return;

  return restApiClient.get(`/getSoldListings`, {
    params: {
      eventId
    }
  });
};

//Open Sale Listings
export const fetchOpenSales = () => {
  return restApiClient.get(`/getOpenSales`);
};

//Open Sale Listings from queue
export const fetchOpenSalesFromQueue = username => {
  return restApiClient.get(`/getOpenSalesFromQueue`, {
    params: {
      username
    }
  });
};

//Open Sale Listings
export const fetchOrderFlow = (page = 1, limit = 5, filter) => {
  return restApiClient.post(
    `/getOrderFlowListings`,
    { filter },
    {
      params: {
        page,
        limit
      }
    }
  );
};

export const ticketPurchased = (listingIds, orderNum, username = null) => {
  if (!Array.isArray(listingIds))
    throw new Error("listingsIds expects to be an array!");

  return restApiClient.post(`/ticketPurchased`, {
    listingIds,
    orderNum,
    username
  });
};

export const getCloakListings = eventId => {
  return restApiClient.get(`/getSkyboxCloakListing`, {
    params: {
      eventId
    }
  });
};

export const resetEmailPassword = params => {
  return emailScrapingClient.post(
    `/TicketMaster/resetEmailPassword`,
    qs.stringify(params)
  );
};

export const deleteOpenListings = listingIds => {
  if (!Array.isArray(listingIds))
    throw new Error("listingsIds expects to be an array!");

  return restApiClient.get(`/orderCompleted`, {
    params: {
      listingIds
    },
    paramsSerializer: params => qs.stringify(params)
  });
};

export const cancelAllListings = eventIds => {
  if (!Array.isArray(eventIds))
    throw new Error("eventIds expects to be an array!");

  return restApiClient.post(`/rescindAllForEvents`, eventIds);
};

export const simulateSoldListing = eventIds => {
  // if (!Array.isArray(eventIds))
  //   throw new Error("eventIds expects to be an array!")

  return restApiClient.post(`/simulateSoldListings`, eventIds);
};

export const cancelListingsByIds = listingIds => {
  if (!Array.isArray(listingIds))
    throw new Error("eventIds expects to be an array!");

  return restApiClient.post(`/rescindAllForTrackListings`, listingIds);
};

export const tryBuyAgain = (listingId, eventId, venueId) => {
  if (!listingId) throw new Error("Listing id is null!");

  return restApiClient.get(`/buyingTicket`, {
    params: {
      listingId: listingId,
      eventId: eventId,
      venueId: venueId ? venueId : null
    }
  });
};

export const fetchUserSummary = eventId => {
  if (!eventId) throw new Error("Listing id is null!");

  return restApiClient.get(`/userPurchaseSummary`, {
    params: {
      eventId: eventId
    }
  });
};

export const doneBuying = (
  listingId,
  orderNum,
  secondaryMarketOrderNum,
  secondaryMarketLocation,
  // emailOption,
  //  problemNotes,
  purchaseRow,
  purchaseSection,
  isPurchaseSecRow,
  seatNumber,
  username
) => {
  if (!listingId) throw new Error("doneBuying Listing id is null!");

  return restApiClient.put(`/doneBuying/${listingId}`, {
    orderNum,
    secondaryMarketOrderNum,
    secondaryMarketLocation,
    // emailOption,
    // problemNotes
    purchaseRow,
    purchaseSection,
    isPurchaseSecRow,
    seatNumber,
    username
  });
};

export const problemBuying = (
  listingId,
  reason = "Not defined!",
  problemNotes
) => {
  if (!listingId)
    throw new Error("problemBuying expects a listingId argument!");

  return restApiClient.put(`/problemBuying/${listingId}`, {
    reason,
    problemNotes
  });
};

//Open Transfer Listings
export const fetchOpenTransfer = () => {
  return restApiClient.get(`/getOpenTransfers`);
};

export const mannualTransfer = (listingId, cloakListing) => {
  if (!listingId) throw new Error("Listing id is null!");

  return restApiClient.post(`/manualPdfTransfer`, {
    listingId,
    cloakListing
  });
};

//Upcoming open orders
export const fetchUpcomingOpenOrders = () => {
  return restApiClient.get(`/getUpcomingOpen`);
};

//Get PDF Attachment
export const fetchPDFAttachment = invoiceId => {
  return restApiClient.get(`/getPDFAttachment`, {
    params: {
      invoiceId
    }
  });
};

//Get EVENUE PDF Attachment
export const fetchEvenuePDF = orderId => {
  return restApiClient.get(`/getSingleEvenueTicketsFromGmail`, {
    params: {
      orderId
    }
  });
};

export const sendEMail = emailTemplate => {
  // if (!Array.isArray(eventIds))
  //   throw new Error("eventIds expects to be an array!")

  return restApiClient.post(`/sendEmail`, emailTemplate);
};

// for Statistics

export const fetchSoldStatisticsLog = (startDate, endDate) => {
  return restApiClient.get(`/getSoldStatistics`, {
    params: {
      startDate,
      endDate
    }
  });
};

export const fetchPDFDownloaded = (listingId, orderNum) => {
  return restApiClient.get(`/downloadPdf`, {
    params: {
      listingId,
      orderNum
    }
  });
};

export const fetchOrderFullFillment = (
  customerDisplayName,
  externalReference
) => {
  return restApiClient.get(`/getfulfillOrder`, {
    params: {
      customerDisplayName,
      externalReference
    }
  });
};

export const updateEventTmOrderNumber = (listingId, orderNum, orderNotes) => {
  return restApiClient.post(`/updateOrderNumber/${listingId}`, {
    orderNum,
    orderNotes
  });
};

// Broadcast / UnBroadcast Events by days
export const broadcastOrUnbroadcastEventForDays = (hours, broadcastState) => {
  return restApiClient.post(`/broadcastOrUnbroadcastEventsForDynamicDays`, {
    hours,
    broadcastState: broadcastState == false ? 0 : 1
  });
};

export const fetchBroadcastOrUnbroadcastEventForDays = () => {
  return restApiClient.get(`/fetchBroadcastOrUnbroadcastEventsForDynamicDays`);
};

export const fetchSlipOrder = (startDate, endDate) => {
  return restApiClient.get(`/getSlipOrders`, {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  });
};

export const fetchUpComingOrder = () => {
  return restApiClient.get(`/getUpComingOrder`);
};

// for sales Statistics

export const fetchSalesStatisticsLog = (startDate, endDate, salesType) => {
  return restApiClient.get(`/getSalesStatistics`, {
    params: {
      startDate,
      endDate,
      salesType
    }
  });
};

export const fetchSalesByMarket = (startDate, endDate, salesType) => {
  return restApiClient.get(`/getSalesByMarketType`, {
    params: {
      startDate,
      endDate,
      salesType
    }
  });
};

export const fetchSalesByVenue = (startDate, endDate, sortBy, limit) => {
  return restApiClient.get(`/getSaleByVenue`, {
    params: {
      startDate,
      endDate,
      sortBy,
      limit
    }
  });
};

export const fetchSalesByHourBeforeEvent = () => {
  return restApiClient.get(`/getSalesByHourBeforeEvent`);
};

export const fetchSalesByPerformer = (startDate, endDate, sortBy, limit) => {
  return restApiClient.get(`/getSaleByPerformerId`, {
    params: {
      startDate,
      endDate,
      sortBy,
      limit
    }
  });
};

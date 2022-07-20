import { restApiClient } from ".";

//Order Status Listings
export const fetchEventStatistic = (startDate, endDate, type, page, limit) => {
  return restApiClient.post(
    `/getEventsStatisticsLog`,
    {
      // timeRange: groupByTimeRange
      startDate: startDate,
      endDate: endDate,
      type
    },
    {
      params: {
        // timeRange: groupByTimeRange
        page,
        limit
      }
    }
  );
};

export const fetchEventStatisticCount = (startDate, endDate) => {
  return restApiClient.post(`/getEventsStatisticsLogCount`, {
    // timeRange: groupByTimeRange
    startDate: startDate,
    endDate: endDate
  });
};

//For event Monitor
export const fetchEventMonitor = () => {
  return restApiClient.get(`/getEventsMonitorLog`);
};

//For ReMonitor Presale event
export const fetchEventReMonitorPresale = () => {
  return restApiClient.get(`/getEventRemonitorPresaleLogs`);
};

//For unmatchedEvents Queue
export const fetchUnmatchedEventQueue = (page = 1, limit = 5, filter) => {
  return restApiClient.post(
    "/unmatchedEventQueue",
    { filter },
    {
      params: {
        page,
        limit
      }
    }
  );
};

//For unmatchedEvents Queue
export const fetchMisMatchedEventQueue = (
  page = 1,
  limit = 5,
  filter = null
) => {
  return restApiClient.post(
    "/misMatchEventQueue",
    { filter },
    {
      params: {
        page,
        limit
      }
    }
  );
};

//For unmatchedEvents Queue
export const fetchShowOnSale = (startDate, endDate) => {
  return restApiClient.post("/getShowsOnSaleEvents", {
    startDate: startDate,
    endDate: endDate
  });
};

export const updateByMismatchFromEventQueue = queryParams => {
  return restApiClient.put(
    `/updateByMismatchFromEventQueue`,
    {},
    { params: { ...queryParams } }
  );
};

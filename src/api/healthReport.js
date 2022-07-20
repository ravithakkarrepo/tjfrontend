import { restApiClient } from ".";

export const fetchSaleMarginHealthReport = payload => {
  return restApiClient.get(`/getSaleMarginHealthReport`, {
    params: payload
  });
};

export const fetchMarketwiseSaleMarginHealthReport = payload => {
  return restApiClient.get(`/getMarketwiseSaleMarginHealthReport`, {
    params: payload
  });
};

export const fetchSkyboxEventsHealthReport = payload => {
  return restApiClient.get(`/getSkyboxEventsHealthReport`, {
    params: payload
  });
};

export const fetchSkyboxPostedEventsHealthReport = payload => {
  return restApiClient.get(`/getSkyboxPostedEventsHealthReport`, {
    params: payload
  });
};

export const fetchSkyboxPostedPresaleEventsHealthReport = payload => {
  return restApiClient.get(`/getSkyboxPostedPresaleEventsHealthReport`, {
    params: payload
  });
};

export const fetchEventQueueHealthReport = payload => {
  return restApiClient.get(`/getEventQueueHealthReport`, {
    params: payload
  });
};

export const fetchCancelledSkyboxEventsHealthReport = payload => {
  return restApiClient.get(`/getCancelledSkyboxEventsHealthReport`, {
    params: payload
  });
};

export const fetchUpdateHealthReportConfig = payload => {
  return restApiClient.post(`/updateHealthReportConfig`, payload);
};

export const fetchPresaleEventsHealthReport = payload => {
  return restApiClient.get(`/getPresaleEventsHealthReport`, {
    params: payload
  });
};

export const fetchEventMonitoringHealthReport = payload => {
  return restApiClient.get(`/eventMonitoringHealthReport`, {
    params: payload
  });
};

import { restApiClient } from ".";

export const fetchEventsLog = groupType => {
  return restApiClient.post("/getEventsLog", groupType);
};

export const fetchLogDetails = (instanceId, eventId) => {
  return restApiClient.get(`/getLogDetails`, {
    params: {
      instanceId,
      eventId
    }
  });

  // return restApiClient.get("/getLogDetails")
};

export const fetchMediumTermLog = () => {
  return restApiClient.get("/getMediumTermLogs");
};

export const fetchLongTermLog = () => {
  return restApiClient.get("/getLongTermLogs");
};
//
export const fetchViewLog = (type, date, time) => {
  return restApiClient.get(`/getInstanceDetailsLog`, {
    params: {
      type,
      date,
      time
    }
  });
};

export const downloadInstanceDetailsLog = (type, date, time, instanceId) => {
  return restApiClient.get(`/downloadInstanceDetailsLog`, {
    params: {
      type,
      date,
      time,
      instanceId
    }
  });
};

export const getFailedEventDetailsLog = (
  type,
  date,
  time,
  instanceTimestamp,
  instanceId
) => {
  return restApiClient.get(`/getFailedEventsDetailsLog`, {
    params: {
      type,
      date,
      time,
      instanceTimestamp,
      instanceId
    }
  });
};

export const fetchEventsLogInfo = (startDate, endDate) => {
  return restApiClient.get(`/getLogInfo`, {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  });
};

export const createTriggerAlertForEvents = (
  days,
  minPriceQnty,
  percentage,
  alertName,
  is_check_decrease
) => {
  return restApiClient.get(`/triggerAlertForEventsDrop`, {
    params: {
      percentage,
      days,
      minPriceQnty,
      alertName,
      is_check_decrease
    }
  });
};

export const fetchTriggerAlertForEvents = () => {
  return restApiClient.get(`/getAlertTriggerInfo`, {});
};

export const fetchAllAlertInfoTypes = () => {
  return restApiClient.get(`/getAllAlertInfo`, {});
};

export const updateAlertInfo = (Id, body) => {
  return restApiClient.post(`/updateAlertInfo/${Id}`, body);
};

export const deleteAlertInfo = Ids => {
  return restApiClient.post(`/deleteAlertInfo`, { Ids });
};

import { restApiClient } from ".";

export const fetchGlobals = () => {
  return restApiClient.get("/getGlobals");
};

export const fetchGlobals_Tab = () => {
  return restApiClient.get("/getGlobals_tab");
};

export const deleteGlobalConfigs = globals => {
  if (!globals) throw new Error("No Key Found For Delete!");
  return restApiClient.post(`/deleteGlobals`, {
    globals
  });
};

export const updateGlobalConfig = globalKey => {
  if (!globalKey) throw new Error("No Key Found For Update!");

  return restApiClient.put(`/updateGlobals`, {
    globalKey
  });
};

export const addGlobalConfigs = globalKey => {
  if (!globalKey) throw new Error("No Key Found For Add!");

  return restApiClient.post(`/addGlobal`, {
    globalKey
  });
};

export const registerToTopic = (token, topic) => {
  // if (!eventId) throw new Error("An eventId is null!")
  return restApiClient.get(`/registerToTopic`, {
    params: {
      token,
      topic
    }
  });
};

// export const registerWebBrowsertoken = (token) => {
//   if (!token) throw new Error("Token is null!")
//   return restApiClient.post(`/registerWebBrowsertoken`, {
//     token
//   })
// }

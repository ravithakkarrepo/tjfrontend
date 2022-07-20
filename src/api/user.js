import { restApiClient } from ".";

export const login = body => {
  return restApiClient.post("/login", body);
};

export const logout = body => {
  return restApiClient.post("/logout", body);
};

export const userUpdateProfile = (body, _id) => {
  return restApiClient.put(`/updateJockeyUser/${_id || body._id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const fetchUserProfile = user_id => {
  return restApiClient.get(`/getJockeyAccount/${user_id}`);
};

export const fetchAllJockeyAccounts = () => {
  return restApiClient.get(`/getAllJockeyAccounts`);
};

export const validateUser = body => {
  return restApiClient.post("/auth/google", body);
};

export const updateUserForBreak = (userId, breakStatus) => {
  return restApiClient.put(`/updateUserForBreak/${userId}/${breakStatus}`);
};

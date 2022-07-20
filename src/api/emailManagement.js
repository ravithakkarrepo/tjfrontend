import { restApiClient } from ".";

//Email management
export const createEmailManagement = (emailManagement, venueId) => {
  if (!emailManagement) throw new Error("An venue object is null!");
  return restApiClient.post(
    `/createEmailManagements`,
    venueId && venueId !== null
      ? { venueId, ...emailManagement }
      : emailManagement
  );
};

export const deleteEmailManagement = (emailManagement, venueId) => {
  if (!emailManagement) throw new Error("An keyword is null!");

  return restApiClient.put(`/deleteEmailManagement`, {
    emailManagement,
    venueId
  });
};

export const fetchEmailManagement = venueId => {
  return restApiClient.post(`/getEmailManagements`, { venueId });
};

export const updateEmailManagement = (emailManagement, venueId, _id) => {
  if (!emailManagement) throw new Error("No Key Found For Update!");

  return restApiClient.put(`/updateEmailManagement/${_id}`, emailManagement);
};

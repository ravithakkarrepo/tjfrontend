import axios from "axios";

const eventApiInfo = {
  baseURL: "https://www.ticketmaster.com/json/search"
};

let url = window.location.href;

var env = url.includes("localhost") ? "dev" : "prod";

const restApiInfo = {
  // Parse env of url
  // baseURL: `http://ticket-jockey-backend-${env}.mybluemix.net/api` || "/api"
  // baseURL: `https://tj-backend-${env}.mybluemix.net/api` || "/api"
  // baseURL: `https://tj-backend-${env}.mybluemix.net/api` || "/api"
  // baseURL: `https://tj.php-development-services.com/api` || "/api"
  // https://tj.php-development-services.com/api
  baseURL: `https://tjmongoapi.php-development-services.com/api` || "/api"

  // baseURL: `http://localhost:8080/api` || "/api"
};

const createEventApiClient = ({ baseURL }) =>
  axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    params: {
      countryCode: "US"
    }
  });

const createAwsApiClient = ({ baseURL }) =>
  axios.create({
    baseURL: "",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

const createRestApiClient = ({ baseURL }) =>
  axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    // params: {
    //   useProxy: false
    // }
  });

const createEmailScrapingClient = ({ baseURL }) =>
  axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

export const ticketApiClient = createEventApiClient(eventApiInfo);

export const restApiClient = createRestApiClient(restApiInfo);

export const awsApiClient = createAwsApiClient(restApiInfo);

export const emailScrapingClient = createEmailScrapingClient(restApiInfo);

/* eslint-disable no-redeclare */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
import React from "react";
import moment from "moment-timezone";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import { dateFormatterWithTZ } from "./date";
export const checkValidation = (eventId, list) => {
  var promo = "";
  if (eventId === "" && list[0].promoName === "") return "all";
  if (eventId === "") return "eventId";
  if (eventId !== "") {
    for (var i = 0; i < list.length; i++) {
      if (list[i].promoName === "") {
        promo = "promoName";
        break;
      } else {
        promo = "";
      }
    }
    return promo;
  }
};

export const pctValidation = (pctValue, isPctTrue) => {
  if (isPctTrue && pctValue == 0) {
    return false;
  }
  if (isPctTrue && parseFloat(pctValue) < 0) {
    return false;
  }
};

export const isUrlValid = url => {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
    url
  );
};

export const isValidEmail = email => {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
    email
  );
};

export const routeMapping = (routes, role) => {
  var routeUrl = [];
  if (routes != undefined) {
    routeUrl.push(routes[1]);
    routeUrl.push(routes[3]);
    routeUrl.push(routes[4]);
    routeUrl.push(routes[5]);
    routeUrl.push(routes[7]);
    routeUrl.push(routes[11]);
    routeUrl.push(routes[12]);
    routeUrl.push(routes[15]);
    if (role === "manager") {
      routeUrl.push(routes[16]);
    }
    routeUrl.push(routes[17]);
    routeUrl.push(routes[20]);

    return routeUrl;
  } else {
    return (routes = []);
  }
};

export const filterUniqueSection = data => {
  var section = [];
  data.map((item, i) => {
    item.secRows.map((d, i) => {
      var jsonObj = { key: d.key.split(",")[0], isBlackList: d.isBlackList };
      section.push(jsonObj);
    });
  });

  let newArray = [];
  let uniqueObject = {};
  for (let i in section) {
    var objTitle = section[i]["key"];
    uniqueObject[objTitle] = section[i];
  }
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  return newArray;
};

export const checkingforBlacklistSection = (section, data) => {
  return data != undefined ? data.includes(section) : "";
};
export const checkForBackWordPagination = (array, page) => {
  var bookMark = array[page - 2];
  if (bookMark != undefined || bookMark !== "") return bookMark;
  else return "";
};

export const getCurrentWorkingEmployee = array => {
  var activeUserArray = [];
  var activeUserList = [];
  if (array.length != 0) {
    if (array !== undefined) {
      array.timerInfo = array.timerInfo.filter(function(isActive) {
        if (isActive.is_online) {
          return false;
        }
        return true;
      });
      array.users = array.users.filter(function(isActive) {
        if (isActive.is_online) {
          return false;
        }
        return true;
      });
      for (var activeUser of array.timerInfo) {
        if (activeUser.timeEntry !== undefined) {
          var newTimeArray = activeUser.timeEntry.filter(item => {
            if (item.clockOut === "00:00:00") {
              return item;
            }
          });

          if (newTimeArray.length != 0) {
            var newArray = new Date();
            var clockIn = moment(newTimeArray[0].clockIn)
              .tz("America/New_York")
              .format("MM/DD/YYYY HH:mm:ss A");
            let newEstTime = moment(newArray)
              .tz("America/New_York")
              .format("MM/DD/YYYY HH:mm:ss A");
            var newTime =
              moment(newEstTime, "MM/DD/YYYY HH:mm:ss A").diff(
                moment().startOf("day"),
                "seconds"
              ) -
              moment(clockIn, "MM/DD/YYYY HH:mm:ss A").diff(
                moment().startOf("day"),
                "seconds"
              );
            var totalHours = moment.duration(activeUser.totalHours).asSeconds();
            newTime = totalHours + newTime;
            // const getSeconds = `0${newTime % 60}`.slice(-2)
            const minutes = `${Math.floor(newTime / 60)}`;
            const getMinutes = `0${minutes % 60}`.slice(-2);
            const getHours = `0${Math.floor(newTime / 3600)}`.slice(-2);
            activeUserList.push({ userName: activeUser.userName });
            activeUserArray.push(
              <div className="dd_user_bx">
                <div className="dd_user_img_bx">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {activeUser.userName} is currently working since last{" "}
                        {`${getHours} : ${getMinutes}`} hours (HH:MM)
                      </Tooltip>
                    }
                  >
                    <Image
                      src={
                        activeUser.profile && activeUser.profile !== ""
                          ? activeUser.profile
                          : require("./../assets/img/profile1.png")
                      }
                      roundedCircle
                      height="70"
                      width="70"
                    />
                  </OverlayTrigger>
                  <img
                    alt=""
                    className="status_img"
                    src={require("./../assets/img/online.png")}
                  />
                </div>
                <span className="dd_user_name">{activeUser.userName}</span>
              </div>
            );
          }
        }
      }
    }

    for (var user of array.users) {
      if (!activeUserList.some(active => active.userName === user.username)) {
        activeUserArray.push(
          <div className="dd_user_bx">
            <div className="dd_user_img_bx">
              <Image
                src={
                  user.profile && user.profile !== ""
                    ? user.profile
                    : require("./../assets/img/profile1.png")
                }
                roundedCircle
                height="70"
                width="70"
              />
              <img
                alt=""
                className="status_img"
                src={require("./../assets/img/offline.png")}
              />
            </div>
            <span className="dd_user_name">{user.username}</span>
          </div>
        );
      }
    }
  }

  return activeUserArray;
};

export const getRecentTotalHours = array => {
  if (array.length != 0 && array !== undefined) {
    var newTimeArray = array.timerInfo.filter(item => {
      if (item.clockOut === "-") {
        return item;
      }
    });
    if (newTimeArray.length != 0) {
      var newArray = new Date().toISOString();
      let newEstTime = moment(newArray)
        .tz("America/New_York")
        .format("hh:mm:ss A");
      var newTime =
        moment(newEstTime, "HH:mm:ss A").diff(
          moment().startOf("day"),
          "seconds"
        ) -
        moment(newTimeArray[0].clockIn, "HH:mm:ss A").diff(
          moment().startOf("day"),
          "seconds"
        );
      var totalHours = moment.duration(array.totalHours).asSeconds();
      newTime = totalHours + newTime;
      const getSeconds = `0${newTime % 60}`.slice(-2);
      const minutes = `${Math.floor(newTime / 60)}`;
      const getMinutes = `0${minutes % 60}`.slice(-2);
      const getHours = `0${Math.floor(newTime / 3600)}`.slice(-2);
      return `${getHours} : ${getMinutes} : ${getSeconds}`;
    } else {
      return array.totalHours;
    }
  } else {
    return "00:00:00";
  }
};

export const formatTimeInHoursMin = time => {
  if (time !== undefined) {
    //  var newTime = time.split(" ")
    var formattedTime = dateFormatterWithTZ(time)("America/New_York");
    // newTime[0].split(":")[0] +
    //  ":" +
    // newTime[0].split(":")[1] +
    //  " " +
    // newTime[1]
    return formattedTime;
  } else {
    return "-";
  }
};

export const getDates = (startDate, endDate) => {
  var dateArray = [];
  var currentDate = moment(startDate);
  var endDate = moment(endDate);
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};

export const getLabel = (startDate, endDate) => {
  return getDates(startDate, endDate);
};

export const getData = (dataArray, startDate, endDate) => {
  var dateArray = getDates(startDate, endDate);
  var eventAddedTotal = [];
  for (var date of dateArray) {
    if (dataArray != undefined) {
      var eventAddedArray = dataArray.filter(
        d =>
          moment(d.date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );
      if (eventAddedArray.length != 0) {
        eventAddedTotal.push(eventAddedArray[0].totalCount);
      }
    } else {
      eventAddedTotal.push(0);
    }
  }
  return eventAddedTotal;
};

export const getManagedEventsData = (dataArray, startDate, endDate) => {
  var dateArray = getDates(startDate, endDate);
  var eventAddedTotal = [];
  for (var date of dateArray) {
    if (dataArray != undefined) {
      var eventAddedArray = dataArray.filter(
        d =>
          moment(d.date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );
      if (eventAddedArray.length != 0) {
        eventAddedTotal.push(eventAddedArray[0].totalCount);
      }
    } else {
      eventAddedTotal.push(0);
    }
  }
  return eventAddedTotal;
};

export const getVenueData = (dataArray, startDate, endDate) => {
  var dateArray = getDates(startDate, endDate);
  var eventVenueTotal = [];
  for (var date of dateArray) {
    if (dataArray != undefined) {
      var eventVenueArray = dataArray.filter(
        d =>
          moment(d.date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );
      if (eventVenueArray.length != 0) {
        eventVenueTotal.push(eventVenueArray[0].totalCount);
      }
    } else {
      eventVenueTotal.push(0);
    }
  }
  return eventVenueTotal;
};

export const getEventByplatform = (marketType, dataArray) => {
  var eventArray = "";
  if (marketType == "TM") {
    eventArray = dataArray.filter(d => d.marketType !== "eVenue");
  } else {
    eventArray = dataArray.filter(d => d.marketType === "eVenue");
  }
  return eventArray.length;
};

export const isObject = objValue => {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
};

export const formatedData = (globals, tabName) => {
  return Object.keys(globals).map(key => ({
    keyName: key,
    value: isObject(globals[key]) ? JSON.stringify(globals[key]) : globals[key],
    tabName
  }));
};

export const checkValidationForGlobal = (keyName, value, tabName) => {
  if (keyName !== "" && value !== "" && tabName !== "") {
    return true;
  } else return false;
};

export const getDatesRange = (startDate, endDate) => {
  var dateArray = [];
  var currentDate = moment(startDate);
  var endDate = moment(endDate);
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).format("MM/DD/YY"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};

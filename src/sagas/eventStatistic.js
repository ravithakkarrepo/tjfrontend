/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/eventStatistic";
import * as userActions from "../actions/users";
import * as api from "../api/eventStatistic";
import { dateFormatterWithTZ, dateFormatter } from "../utils";

const formatEventMonitorData = events => {
  var updatedEvents = events.eventsAdded.filter(
    event =>
      !(
        (new Date(event.onSaleDate) > new Date() && event.presale === false) ||
        (new Date(event.onSaleDate) > new Date() && event.presale === undefined)
      )
  );

  var updatedEventsOnCount = events.eventsAdded.filter(
    event =>
      (new Date(event.onSaleDate) > new Date() && event.presale === false) ||
      (new Date(event.onSaleDate) > new Date() && event.presale === undefined)
  );
  return {
    eventsAdded: sortOverFlowListings(updatedEvents),
    onCountPresale: updatedEventsOnCount
  };
};

//Open Sale Listings
const sortOverFlowListings = data => {
  const notExistOnSaleDateOrPresale = [],
    existOnSaleDateOrPresale = [],
    notExistOnSaleDateOrPresaleSort = [],
    existOnSaleDateOrPresaleSort = [];

  Object.values(data).forEach(row => {
    const { onSaleDate, presale } = row;
    // if (onSaleDate === undefined || presale === undefined) {
    if (
      row.presale == false &&
      (!row.pctVenueAvail || row.pctVenueAvail == 0) &&
      (!row.gaAvailability || row.gaAvailability == 0)
    ) {
      notExistOnSaleDateOrPresale.push(row);
    } else {
      existOnSaleDateOrPresale.push(row);
    }
  });

  const notExistOnSaleDateOrPresaleSorted = [...notExistOnSaleDateOrPresale];

  const existOnSaleDateOrPresaleSorted = [...existOnSaleDateOrPresale];

  Object.values(notExistOnSaleDateOrPresaleSorted).forEach(row => {
    notExistOnSaleDateOrPresaleSort.push(row);
  });

  Object.values(existOnSaleDateOrPresaleSorted).forEach(row => {
    existOnSaleDateOrPresaleSort.push(row);
  });

  return {
    sortedEventQueueListings: [
      ...existOnSaleDateOrPresaleSort,
      ...notExistOnSaleDateOrPresaleSort
    ]
  };
};
function* fetchEventStatisticSaga(action) {
  const {
    startDate,
    endDate,
    type,
    isCallCount,
    page,
    sizePerPage
  } = action.payload;
  try {
    yield put(appActions.appStartFetching());

    var data;
    var eventsCount;

    if (isCallCount) {
      const [dataEventStatistic, eventStatisticCounts] = yield all([
        call(
          api.fetchEventStatistic,
          startDate,
          endDate,
          type,
          page,
          sizePerPage
        ),
        call(api.fetchEventStatisticCount, startDate, endDate)
      ]);
      data = dataEventStatistic.data;
      eventsCount = eventStatisticCounts.data;
    } else {
      var result = yield call(
        api.fetchEventStatistic,
        startDate,
        endDate,
        type,
        page,
        sizePerPage
      );
      data = result.data;
    }

    if (type === "event_added") {
      yield put(
        actions.fetchEventStatisticSuccess({
          events: data.eventsAdded,
          eventsCount,
          page
        })
      );
    }

    if (type === "venue_added") {
      yield put(
        actions.fetchEventStatisticSuccess({
          events: data.venuesAdded,
          eventsCount,
          page
        })
      );
    }

    if (type === "event_monitor") {
      yield put(
        actions.fetchEventStatisticSuccess({
          events: data.allEventsFromQueueToManageEvent,
          eventsCount,
          page
        })
      );
    }

    if (type === "event_cancel") {
      yield put(
        actions.fetchEventStatisticSuccess({
          events: data.eventsCancel,
          eventsCount,
          page
        })
      );
    }

    if (type === "event_postpond") {
      yield put(
        actions.fetchEventStatisticSuccess({
          events: data.eventPostPond,
          eventsCount,
          page
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventMonitorSaga(action) {
  try {
    yield put(appActions.eventQueueStartFetching());

    const { data } = yield call(api.fetchEventMonitor);

    try {
      yield put(actions.fetchEventMonitorSuccess(formatEventMonitorData(data)));
    } catch (err) {
      console.log("err", err);
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.eventQueueStopFetching());
  }
}

function* fetchEventReMonitorPresaleSaga(action) {
  try {
    yield put(appActions.remonitorPresaleEventsStartFetching());

    const { data } = yield call(api.fetchEventReMonitorPresale);

    try {
      yield put(actions.fetchEventReMonitorPresaleSuccess(data));
    } catch (err) {
      console.log("err", err);
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.remonitorPresaleEventsStopFetching());
  }
}

const formatEvents = events => {
  return events.map(event => {
    const {
      _id,
      eventId,
      eventName,
      eventAddress,
      eventDate,
      timeZone,
      eventUrl,
      stubhubEventUrl,
      stubhubEventId,
      skyBoxEventId,
      stockType,
      markupPct,
      broadcastState,
      timestamp,
      timestampAddedToQueue,
      lastKnownOnSaleTime,
      presale,
      availableOffers,
      is_deleted,
      is_blackList,
      daysToEvent,
      daysSinceOnsale,
      termRange,
      pctVenueAvail,
      totalVenueSeats,
      availableToPurchase,
      duplicatSkyBoxEvent,
      aiSuggestedMarkup,
      broadcastStatus,
      skyboxVenueId,
      priceMarkupPct,
      is_priceMarkupPct,
      marketType,
      blackListData,
      is_JokeyAlgo,
      monitorTime,
      presales,
      scrapedDate,
      tMasterVenueId,
      promos,
      venueId
    } = event;

    return {
      _id,
      eventId,
      eventName,
      eventDate,
      formattedEventDate: dateFormatterWithTZ(eventDate)(
        timeZone === undefined ? "America/New_York" : timeZone
      ),
      eventDateUnix: (+new Date(eventDate)).toString(),
      eventAddress,
      eventUrl,
      stubhubEventUrl,
      ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventId}`,
      stubhubEventId,
      skyBoxEventId,
      stockType,
      markupPct,
      broadcastState,
      timestamp: dateFormatter(timestamp),
      timestampAddedToQueue: dateFormatter(timestampAddedToQueue),
      lastKnownOnSaleTime: dateFormatter(lastKnownOnSaleTime),
      presale: presale || false,
      is_deleted: is_deleted == 1 ? true : false,
      is_blackList: is_blackList == 1 ? true : false,
      daysToEvent,
      daysSinceOnsale,
      termRange,
      pctVenueAvail,
      totalVenueSeats,
      totalAvailability: Math.floor(totalVenueSeats * pctVenueAvail),
      availableToPurchase: availableToPurchase || true,
      duplicatSkyBoxEvent: duplicatSkyBoxEvent ? "true" : "false",
      aiSuggestedMarkup: aiSuggestedMarkup || 0,
      broadcastStatus: broadcastStatus || "1",
      skyboxVenueId: skyboxVenueId ? skyboxVenueId : "",
      priceMarkupPct: priceMarkupPct ? priceMarkupPct : "",
      is_priceMarkupPct: is_priceMarkupPct ? is_priceMarkupPct : false,
      availableOffers: availableOffers ? availableOffers : "",
      marketType,
      blackListData,
      is_JokeyAlgo: is_JokeyAlgo == 1 ? true : false,
      monitorTime: monitorTime
        ? dateFormatterWithTZ(monitorTime)(
            timeZone === undefined ? "America/New_York" : timeZone
          )
        : "",
      presales,
      promos,
      scrapedDate: scrapedDate ? scrapedDate : "",
      tMasterVenueId,
      timeZone,
      venueId
    };
  });
};

function* fetchUnmatchedEventQueueSaga(action) {
  try {
    yield put(appActions.unMatchedEventStartFetching());
    const { data } = yield call(
      api.fetchUnmatchedEventQueue,
      action.payload.page,
      action.payload.limit,
      action.payload.filter
    );
    yield put(
      actions.fetchUnmatchedEventQueueSuccess({
        unmatchedEventsAdded: formatEvents(data.data.unmatchedEventsAdded),
        totalListing: data.data.totalEvent,
        page: action.payload.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.unMatchedEventStopFetching());
  }
}

const formatShowsOnSaleEvents = events => {
  var matchedEvents = [];
  var unMatchedEvents = [];

  matchedEvents = events.filter(evt => evt.type == "matchedEvents");
  unMatchedEvents = events.filter(
    evt => evt.type == "unmatchedEvents" || evt.type == "missing"
  );

  matchedEvents = matchedEvents.map(event => {
    const { eventInfo, type, tmLink, _id, scrapedDate } = event;

    return {
      eventId: eventInfo.eventId,
      eventName: eventInfo.eventName,
      eventStatus: eventInfo.eventStatus,
      scrapedDate,
      tMasterVenueId: eventInfo.tMasterVenueId,
      skyboxVenueId: eventInfo.skyboxVenueId,
      skyboxEventId: eventInfo.skyBoxEventId,
      formattedScrapedDate: dateFormatter(scrapedDate),
      formattedEventDate: dateFormatterWithTZ(eventInfo.eventDate)(
        eventInfo.timeZone === undefined
          ? "America/New_York"
          : eventInfo.timeZone
      ),
      formattedCreatedDate: dateFormatter(eventInfo.created_date),
      eventAddress: eventInfo.eventAddress,
      eventUrl: tmLink,
      is_cancel: eventInfo.is_cancel,
      is_blackList: eventInfo.is_blackList,
      formattedMonitorDate: eventInfo.monitor_date
        ? dateFormatter(eventInfo.monitor_date)
        : null,
      type,
      ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventInfo.eventId}`
    };
  });

  unMatchedEvents = unMatchedEvents.map(event => {
    const { eventInfo, type, tmLink, _id, scrapedDate } = event;

    return {
      eventId: eventInfo.eventId,
      eventName: eventInfo.eventName,
      scrapedDate,
      tMasterVenueId: eventInfo.tMasterVenueId,
      skyboxVenueId: eventInfo.skyboxVenueId,
      formattedScrapedDate: dateFormatter(scrapedDate),
      formattedEventDate: dateFormatterWithTZ(eventInfo.eventDate)(
        eventInfo.timeZone === undefined
          ? "America/New_York"
          : eventInfo.timeZone
      ),
      eventAddress: eventInfo.eventAddress,
      eventUrl: tmLink,
      type,
      ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventInfo.eventId}`
    };
  });

  return {
    unMatchedEvents,
    matchedEvents
  };
  // return events.map(event => {
  //   const { eventInfo, type, tmLink, _id, scrapedDate } = event

  //   let showsOnSaleData = {
  //     eventId: eventInfo.eventId,
  //     eventName: eventInfo.eventName,
  //     scrapedDate,
  //     tMasterVenueId: eventInfo.tMasterVenueId,
  //     skyboxVenueId: eventInfo.skyboxVenueId,
  //     formattedScrapedDate: dateFormatter(scrapedDate),
  //     eventAddress: eventInfo.eventAddress,
  //     eventUrl: tmLink,
  //     type,
  //     ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventInfo.eventId}`
  //   }
  //   return {
  //     eventId: eventInfo.eventId,
  //     eventName: eventInfo.eventName,
  //     scrapedDate,
  //     tMasterVenueId: eventInfo.tMasterVenueId,
  //     skyboxVenueId: eventInfo.skyboxVenueId,
  //     formattedScrapedDate: dateFormatter(scrapedDate),
  //     eventAddress: eventInfo.eventAddress,
  //     eventUrl: tmLink,
  //     type,
  //     ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventInfo.eventId}`
  //   }
  // }
  // )
};

function* fetchShowsOnSaleSaga(action) {
  const {
    startDate,
    endDate,
    isFetchedFromMatch,
    isFetchedFromUnmatch
  } = action.payload;
  try {
    if (isFetchedFromMatch) {
      yield put(appActions.showsOnSaleMatchedEventStartFetching());
    } else {
      yield put(appActions.appStartFetching());
    }
    const { data } = yield call(api.fetchShowOnSale, startDate, endDate);
    yield put(
      actions.fetchShowOnSaleSuccess({
        saleData: formatShowsOnSaleEvents(data.data),
        isFetchedFromMatch,
        isFetchedFromUnmatch
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    if (isFetchedFromMatch) {
      yield put(appActions.showsOnSaleMatchedEventStopFetching());
    } else {
      yield put(appActions.appStopFetching());
    }
  }
}

function* fetchMisMatchedEventQueueSaga(action) {
  try {
    yield put(appActions.misMatchedEventStartFetching());
    const { data } = yield call(
      api.fetchMisMatchedEventQueue,
      action.payload.page,
      action.payload.limit,
      action.payload.filter
    );
    yield put(
      actions.fetchMisMatchedEventQueueSuccess({
        misMatchedEvents: formatEvents(data.data.misMatchedEvents),
        totalEvent: data.data.totalEvent,
        page: action.payload.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.misMatchedEventStopFetching());
  }
}

function* updateByMismatchFromEventQueueSaga(action) {
  try {
    const {
      data: { success }
    } = yield call(api.updateByMismatchFromEventQueue, action.payload);
    if (success) {
      yield put(
        appActions.appReceiveAlert({
          message: "Event updated successfully."
        })
      );
      yield put(actions.updateByMismatchFromEventQueueSuccess(action.payload));
    } else {
      yield put(
        appActions.appReceiveError({
          message: "Something went wrong! Please try again "
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error));
    } else if (error.response.status === 400) {
      yield put(
        appActions.appReceiveError({
          message:
            error.response.data.message ||
            "Something went wrong! Please try again "
        })
      );
    } else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* watchEventStatisticSaga() {
  // for Event Statistic
  yield takeLatest(
    actions.FETCH_EVENT_STATISTIC_REQUEST,
    fetchEventStatisticSaga
  );
  yield takeLatest(actions.FETCH_EVENT_MONITOR_REQUEST, fetchEventMonitorSaga);

  yield takeLatest(
    actions.FETCH_UNMATCHEDEVENT_QUEUE_REQUEST,
    fetchUnmatchedEventQueueSaga
  );
  yield takeLatest(
    actions.FETCH_MIS_MATCHED_EVENT_QUEUE_REQUEST,
    fetchMisMatchedEventQueueSaga
  );
  yield takeLatest(
    actions.FETCH_SHOWONSALE_EVENT_REQUEST,
    fetchShowsOnSaleSaga
  );

  yield takeEvery(
    actions.updateByMismatchFromEventQueueRequest,
    updateByMismatchFromEventQueueSaga
  );
  yield takeLatest(
    actions.FETCH_EVENT_REMONITOR_PRESALE_REQUEST,
    fetchEventReMonitorPresaleSaga
  );
}

export default watchEventStatisticSaga;

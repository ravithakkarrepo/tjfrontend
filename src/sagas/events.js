/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  call,
  take,
  takeLatest,
  put,
  takeEvery,
  all,
  race
} from "redux-saga/effects";

import { dateFormatter, dateFormatterWithTZ } from "../utils";
import * as appActions from "../actions/app";
import * as userActions from "../actions/users";
import * as eventStatisticsActions from "../actions/eventStatistic";

import * as actions from "../actions/events";
import * as api from "../api/events";
import * as eventStatisticsApi from "../api/eventStatistic";
import * as ticketsApi from "../api/tickets";
import {
  fetchTrackedListingsSuccess
  // fetchSoldListingsSuccess
} from "../actions/listings";
import { fetchTicketsByEventIdSuccess } from "../actions/tickets";
import * as listingsApi from "../api/listings";
import {
  formatTrackedListings
  // formatSoldListings
} from "./listings";
import * as constants from "../constants";
import * as eventStatistiActions from "../actions/eventStatistic";

const composeEvents = ({ numFound, eventInfo }) => {
  const curDate = Date.now();
  const events = eventInfo.reduce((accu, event) => {
    const {
      eventName,
      eventId,
      eventDate,
      VenueId,
      eventAddress,
      timeZone,
      VenueName,
      VenueAddress,
      VenueCity,
      VenueState,
      VenueCityState,
      VenuePostalCode
    } = event;

    if (new Date(eventDate) - curDate > 0) {
      //filter events that take place before the current time
      accu.push({
        eventId,
        eventName,
        eventDate,
        formattedEventDate: dateFormatterWithTZ(eventDate)(timeZone),
        venueId: VenueId,
        eventAddress,
        stockType: "MOBILE_TRANSFER",
        timeZone,
        VenueName,
        VenueAddress,
        VenueCity,
        VenueState,
        VenueCityState,
        VenuePostalCode
      });
    }

    return accu;
  }, []);

  return {
    events,
    totoalEventsNum: numFound
  };
};

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
      venueId,
      duplicate_by,
      duplicate_date,
      duplicate_reason,
      blacklistReason,
      is_postponed,
      is_cancel,
      is_archived
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
      venueId,
      duplicate_by,
      duplicate_date: dateFormatter(duplicate_date),
      duplicate_reason,
      blacklistReason,
      is_postponed,
      is_cancel,
      is_archived
    };
  });
};

function* fetchEventsByKeywordSaga(action) {
  const { keyword } = action.payload;

  try {
    yield put(appActions.appStartFetching());

    const { data } = yield call(api.fetchEventsByKeyword, keyword);
    const events = composeEvents(data);

    if (!events.totoalEventsNum) {
      yield put(appActions.appReceiveAlert({ message: "Events Not Found" }));
    } else {
      yield put(actions.fetchEventsByKeywordSuccess(events));
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* createManagedEventsSaga(action) {
  const { events } = action.payload;

  try {
    const { data: hasSucceed } = yield call(api.createManagedEvents, events);
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating mangaed events!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating managed events! "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* searchSkyboxQueueEventsSaga(action) {
  const { events } = action.payload;

  try {
    yield put(appActions.eventStartFetching());
    const { data: searchSkyBoxEvents } = yield call(
      api.searchSkyBoxEvents,
      events
    );
    const {
      eventsMap,
      eventsWithSkyBoxInfo,

      eventsWithDuplicates,
      nullSBevents
    } = mergeEventsWithSkyBox(events, searchSkyBoxEvents.eventInfo);

    if (Object.keys(eventsWithDuplicates).length) {
      yield put(actions.showModalSkyBoxEvents(eventsWithDuplicates));
      yield put(appActions.eventStopFetching());

      const { payload: selectedSkyBoxEvents } = yield take(
        actions.SELECT_MODAL_SKYBOX_EVENTS
      );

      Object.entries(selectedSkyBoxEvents).forEach(([evtId, skyboxEvent]) => {
        const {
          id,
          stubhubEventId,
          performerId,
          stubhubEventUrl,
          performer,
          name,
          date,
          venue
        } = skyboxEvent;
        const {
          eventId,
          timeZone,
          eventName,
          eventDate,
          eventAddress,
          stockType,
          VenueId
        } = eventsMap[evtId];
        eventsWithSkyBoxInfo[evtId] = {
          stockType,
          eventInfo: {
            eventId,
            timeZone,
            eventName,
            eventDate,
            eventAddress
          },
          skyBoxEventId: id,
          stubhubEventId,
          performerId,
          performerName: performer.name,
          stubhubEventUrl,
          tMasterVenueId: VenueId,
          skyboxEventInfo: {
            name,
            date,
            venueName: venue.name,
            venueTimeZone: venue.timeZone
          }
        };
      });
    }
    if (Object.keys(eventsWithSkyBoxInfo).length) {
      yield createManagedQueueEventsSaga({
        payload: {
          events: Object.values(eventsWithSkyBoxInfo)
        }
      });
    }

    if (nullSBevents.length > 0) {
      yield put(actions.showModalSkyBoxEventsNotFounded(nullSBevents));
      yield put(appActions.eventStopFetching());
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(new Error("Skybox Not Found")));
  } finally {
    yield put(appActions.eventStopFetching());
  }
}

function* createManagedQueueEventsSaga(action) {
  const { events } = action.payload;

  try {
    const { data: hasSucceed } = yield call(api.createEventFormQueue, events);
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating mangaed events!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating managed events! "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

const composeMap = events =>
  events.reduce((accu, event) => {
    accu[event.eventId] = event;
    return accu;
  }, {});

const mergeEventsWithSkyBox = (events, searchSkyBoxEvents) => {
  const eventsMap = composeMap(events.eventInfo);
  const eventsWithDuplicates = {},
    eventsWithSkyBoxInfo = {},
    nullSBevents = [];

  searchSkyBoxEvents.forEach(({ eventId, SBevents, skyboxVenueId }) => {
    if (SBevents.length >= 1) {
      //the result of searching events through skybox is more than one
      eventsWithDuplicates[eventId] = SBevents;
    } else if (SBevents.length === 1) {
      const {
        id,
        stubhubEventId,
        performerId,
        stubhubEventUrl,
        performer
      } = SBevents[0];
      eventsWithSkyBoxInfo[eventId] = {
        eventInfo: { ...eventsMap[eventId] },
        stockType: eventsMap[eventId].stockType,
        skyBoxEventId: id,
        stubhubEventId,
        performerId,
        performerName: performer.name,
        stubhubEventUrl,
        skyboxVenueId
      };
    } else {
      nullSBevents.push(eventsMap[eventId]);
    }
  });

  return {
    eventsMap,
    eventsWithDuplicates,
    eventsWithSkyBoxInfo,
    nullSBevents
  };
};

function* searchSkyboxVenueIdSaga(action) {
  const { events } = action.payload;

  try {
    const { data: searchSkyBoxEvents } = yield call(
      api.searchSkyBoxEvents,
      events
    );

    if (
      searchSkyBoxEvents.eventInfo.length &&
      searchSkyBoxEvents.eventInfo[0]["SBevents"].length
    ) {
      //use the first venue info from skybox
      yield put(
        actions.setSkyBoxVenueId(
          searchSkyBoxEvents.eventInfo[0]["SBevents"][0]["venue"]["id"]
        )
      );
    } else {
      yield put(actions.setTMasterVenueId(""));
      yield put(actions.setSkyBoxVenueId(""));
      yield put(
        appActions.appReceiveError(new Error("SkyBox Venue Id Not Found!"))
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* searchSkyboxEventsSaga(action) {
  const { events } = action.payload;

  try {
    const { data: searchSkyBoxEvents } = yield call(
      api.searchSkyBoxEvents,
      events
    );
    const {
      eventsMap,
      eventsWithSkyBoxInfo,

      eventsWithDuplicates,
      nullSBevents
    } = mergeEventsWithSkyBox(events, searchSkyBoxEvents.eventInfo);

    if (Object.keys(eventsWithDuplicates).length) {
      yield put(actions.showModalSkyBoxEvents(eventsWithDuplicates));

      const { payload: selectedSkyBoxEvents } = yield take(
        actions.SELECT_MODAL_SKYBOX_EVENTS
      );

      Object.entries(selectedSkyBoxEvents).forEach(([evtId, skyboxEvent]) => {
        const {
          id,
          stubhubEventId,
          performerId,
          stubhubEventUrl,
          performer,
          venue
        } = skyboxEvent;
        const {
          eventId,
          timeZone,
          eventName,
          eventDate,
          eventAddress,
          stockType,
          VenueId
        } = eventsMap[evtId];
        eventsWithSkyBoxInfo[evtId] = {
          stockType,
          // eventInfo: {
          eventId,
          timeZone,
          eventName,
          eventDate,
          eventAddress,
          // },
          skyBoxEventId: id,
          stubhubEventId,
          skyBoxVenueId: venue.id,
          performerId,
          performerName: performer.name,
          stubhubEventUrl,
          tMasterVenueId: VenueId
        };
      });
    }
    if (Object.keys(eventsWithSkyBoxInfo).length) {
      yield createManagedEventsSaga({
        payload: {
          events: Object.values(eventsWithSkyBoxInfo)
        }
      });
    }

    if (nullSBevents.length > 0) {
      yield put(actions.showModalSkyBoxEventsNotFounded(nullSBevents));
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(new Error("Skybox Not Found")));
  } finally {
  }
}

const formatManagedEvents = events => {
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
      is_broadcast,
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
      monitor_date,
      presales,
      promos,
      available_offers
    } = event;

    return {
      _id,
      eventId,
      eventName,
      eventDate,
      formattedEventDate: dateFormatterWithTZ(eventDate)(
        timeZone === undefined ? "America/New_York" : timeZone
      ),
      eventAddress,
      eventUrl,
      stubhubEventUrl,
      ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventId}`,
      stubhubEventId,
      skyBoxEventId,
      stockType,
      markupPct,
      is_broadcast,
      timestamp: dateFormatter(timestamp),
      timestampAddedToQueue: dateFormatter(timestampAddedToQueue),
      lastKnownOnSaleTime: lastKnownOnSaleTime
        ? dateFormatter(lastKnownOnSaleTime)
        : "",
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
      availableOffers: available_offers ? available_offers : "",
      marketType,
      blackListData,
      is_JokeyAlgo: is_JokeyAlgo == 1 ? true : false,
      monitorTime: monitor_date
        ? dateFormatterWithTZ(monitor_date)(
            timeZone === undefined ? "America/New_York" : timeZone
          )
        : "",
      presales,
      promos,
      promoName: promos ? Object.keys(promos) : "",
      promoCode: promos ? Object.values(promos) : "",
      timeZone
    };
  });
};

function* fetchManagedEventsSaga(action) {
  try {
    yield put(appActions.appStartFetching());

    const { data: managedEvents } = yield call(
      api.fetchManagedEvents,
      action.payload
    );

    yield put(
      actions.fetchManagedEventsSuccess({
        totalRow: managedEvents.data.totalEvent,
        eventInfo: SortManagedEvent(
          formatManagedEvents(managedEvents.data.eventList)
        ),
        page: action.payload.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

const SortManagedEvent = data => {
  return data.sort(function(a, b) {
    return new Date(a.formattedEventDate) - new Date(b.formattedEventDate);
  });
};

function* fetchManagedEventsFilterSaga(action) {
  const { page, sizePerPage } = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const { data: managedEvents } = yield call(
      api.fetchManagedEventsFilter,
      page - 1,
      sizePerPage
    );
    yield put(
      actions.fetchManagedEventsFilterSuccess({
        totalRow: managedEvents.total_rows,
        eventInfo: SortManagedEvent(
          formatManagedEvents(managedEvents.eventInfo)
        ),
        page: managedEvents.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchAvailableOffersSaga(action) {
  try {
    const { data } = yield call(api.fetchAvailableOffers);
    yield put(actions.fetchAvailableOfferSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    // yield put(appActions.appStopFetching())
  }
}

function* fetchManagedEventsSearchSaga(action) {
  const {
    searchStartDate,
    searchEndDate,
    eventKey,
    tmEventIdKey,
    venueKey,
    skyBoxEventIdKey,
    availableOffer,
    presaleSearchKey,
    availableOfferKey,
    blackList,
    marketType,
    bookMarks,
    page,
    sizePerPage
  } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data: managedEvents } = yield call(
      api.fetchManagedEventsSearch,
      searchStartDate,
      searchEndDate,
      eventKey,
      tmEventIdKey,
      venueKey,
      skyBoxEventIdKey,
      presaleSearchKey,
      availableOffer,
      availableOfferKey,
      blackList,
      marketType,
      bookMarks,
      page - 1,
      sizePerPage
    );
    yield put(
      actions.fetchManagedEventsFilterSuccess({
        totalRow: managedEvents.total_rows,
        eventInfo: SortManagedEvent(
          formatManagedEvents(managedEvents.eventInfo)
        ),
        page: managedEvents.page,
        bookMarks: managedEvents.bookMark
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

const formatManagedEventsQueue = events => {
  return events.reduce(
    (accu, event) => {
      const {
        _id: listingId,
        eventInfo: { eventId, eventName, eventAddress, eventDate, timeZone },
        stubhubEventUrl
      } = event;

      if (!accu.ids.includes(listingId)) accu.ids.push(listingId);

      accu.dict[listingId] = {
        listingId,
        eventId,
        eventName,
        eventDate,
        formattedEventDate: dateFormatterWithTZ(eventDate)(timeZone),
        eventAddress,
        stubhubEventUrl,
        ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventId}`
      };

      return accu;
    },
    {
      ids: [],
      dict: {}
    }
  );
};

function* fetchManagedEventsQueueSaga() {
  try {
    const {
      data: { events }
    } = yield call(api.fetchManagedEventsQueue);
    yield put(
      actions.fetchManagedEventsQueueSuccess(formatManagedEventsQueue(events))
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* addManagedEventFromQueueSaga(action) {
  try {
    const eventIds = action.payload;
    const {
      data: { success }
    } = yield call(api.addManagedEventFromQueue, eventIds);

    if (success) {
      //yield put(actions.addManagedEventFromQueueSuccess(eventIds))
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed adding managed events!"
        })
      );
    } else {
      yield put(appActions.appReceiveError("Fail To Add Managed Event!"));
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* deleteManagedEventsQueueSaga(action) {
  try {
    const eventIds = action.payload;

    const { data } = yield call(api.deleteManagedEventsQueue, eventIds);
    yield put(actions.deleteManagedEventsQueueSuccess());
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* fetchManagedEventsByKeywordSaga(action) {
  const keyword = action.payload;

  try {
    const { data: managedEvents } = yield call(
      api.fetchManagedEventsByKeyword,
      keyword
    );
    yield put(
      actions.fetchManagedEventsSuccess(formatManagedEvents(managedEvents))
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* deleteManagedEventsSaga(action) {
  const { eventId, keyword } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data: hasSucceed } = yield call(
      api.deleteManagedEvents,
      eventId,
      keyword
    );
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updated managed events!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of managed events! "
          })
        );

    const { data: managedEvents } = yield call(
      api.fetchManagedEventsFilter,
      0,
      20
    );
    yield put(
      actions.fetchManagedEventsFilterSuccess({
        totalRow: managedEvents.total_rows,
        eventInfo: SortManagedEvent(
          formatManagedEvents(managedEvents.eventInfo)
        ),
        page: managedEvents.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* updateManagedEventsSaga(action) {
  const { eventId, body } = action.payload;

  try {
    const { data: ok } = yield call(api.updateManagedEvents, eventId, body);

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a mangaed event!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating a managed event! "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* userOverrideAvailSaga(action) {
  try {
    const { eventId, bool } = action.payload;
    const {
      data: { success }
    } = yield call(api.userOverrideAvail, eventId, bool);

    if (success) {
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed overriding user availbility!"
        })
      );
    } else {
      yield put(
        appActions.appReceiveError({
          message: "Something went wrong with overriding user availbility!"
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* fetchEventInfoByEventIdSaga(action) {
  const { eventId } = action.payload;

  try {
    yield put(appActions.appStartFetching());
    const { parallel, cancelled } = yield race({
      parallel: all([
        call(ticketsApi.fetchTicketsByEventId, eventId),
        call(listingsApi.fetchTrackedListings, eventId)
        // call(listingsApi.fetchSoldListings, eventId)
      ]),
      cancelled: take(actions.CANCEL_FETCH_EVENT_INFO_BY_EVENTID_REQUEST)
    });

    if (parallel) {
      const [tickets, trackedListings, soldListings] = parallel;
      if (!Object.keys(tickets.data).length) {
        //data might be a empty object due to tickets are sold out
        yield put(
          appActions.appReceiveError({
            message: `Event not found or Tickets already sold out! Please Try another event!`,
            type: constants.ERROR_EVENT_NOT_FOUND
          })
        );
      } else {
        yield put(fetchTicketsByEventIdSuccess(tickets.data));
      }

      yield put(
        fetchTrackedListingsSuccess(formatTrackedListings(trackedListings.data))
      );

      // yield put(fetchSoldListingsSuccess(formatSoldListings(soldListings.data)))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventDetailsLogSaga(action) {
  const { eventId, selectedDate } = action.payload;

  try {
    yield put(appActions.eventStartFetching());
    const { data } = yield call(
      api.fetchEventDetailsLog,
      eventId,
      selectedDate
    );
    yield put(actions.fetchEventDetailsLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.eventStopFetching());
  }
}

const formatRePrice = data => {
  var rePriceData = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty("time")) {
      rePriceData.push(data[i]);
    }
  }
  return rePriceData;
};

const sortedRepriceLog = data => {
  return data.sort(function(a, b) {
    a = a.date + " " + a.time;
    b = b.date + " " + b.time;
    return new Date(b) - new Date(a);
  });
};

function* fetchRePriceEventLogSaga(action) {
  const { eventId, StartDate, EndDate } = action.payload;

  try {
    //yield put(appActions.eventStartFetching())
    const { data } = yield call(
      api.fetchRePriceEventLog,
      eventId,
      StartDate,
      EndDate
    );
    yield put(
      actions.fetchRePriceEventLogSuccess(sortedRepriceLog(formatRePrice(data)))
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    //yield put(appActions.eventStopFetching())
  }
}

function* fetchPricePointSaga(action) {
  const { eventId } = action.payload;
  try {
    yield put(appActions.priceStartFetching());
    const { data } = yield call(api.fetchPricePoint, action.payload);
    yield put(actions.fetchPricePointSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.priceStopFetching());
  }
}

function* fetchSecondaryMargetLogsSaga(action) {
  const { eventId } = action.payload;
  try {
    yield put(appActions.secondaryMarketStartFetching());

    const { data } = yield call(api.fetchSecondryMargetLogs, action.payload);
    yield put(actions.fetchSecodaryLogsSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.secondaryMarketStopFetching());
  }
}

function* updatePriceMarkUpPctSaga(action) {
  const { eventId, pctValue, isPctValue } = action.payload;
  // newVenue.venueId = newVenue.url.slice(12).replace(".com/", "")
  try {
    const {
      data: { status }
    } = yield call(api.updatePriceMarkupPct, eventId, {
      priceMarkupPct: pctValue,
      is_priceMarkupPct: isPctValue
    });

    status === "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Price MarkUp PCT!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Price MarkUp PCT!"
          })
        );
    //const { data } = yield call(api.fetchEVenue)
    //yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* bulkUpdatePriceMarkupPctSaga(action) {
  const pageFilter = action.payload.filter;
  delete action.payload.filter;

  try {
    const {
      data: { status }
    } = yield call(api.bulkUpdatePriceMarkupPct, action.payload);

    status === "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Price MarkUp PCT!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Price MarkUp PCT!"
          })
        );

    yield put(actions.fetchManagedEventsRequest(pageFilter));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* getEventsPerformersSaga() {
  try {
    const { data } = yield call(api.getEventsPerformers);
    yield put(actions.fetchEventsPerformersSuccess(data.performerList));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* fetchEventByIdSaga(action) {
  const { eventId } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchManagedEventById, eventId);
    yield put(
      actions.fetchEventByEventIdSuccess(
        data.data.event && formatManagedEvents([data.data.event])[0]
      )
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* updateIsBlackListSaga(action) {
  const {
    eventId,
    is_blackList,
    blacklistReason,
    fromEventQueue = false,
    isFromCountdown,
    isFromRemonitorPresaleTable
  } = action.payload;

  try {
    yield put(appActions.appStartFetching());

    const { data: hasSucceed } = yield call(
      api.updateIsBlackListed,
      eventId,
      is_blackList,
      blacklistReason
    );
    // yield put(eventStatisticsActions.fetchEventMonitorRequest())
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Event Successfully Updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of managed events! "
          })
        );

    if (action.payload.hasOwnProperty("searchPayload")) {
      const { data: managedEvents } = yield call(
        api.fetchManagedEvents,
        action.payload.searchPayload
      );

      yield put(
        actions.fetchManagedEventsSuccess({
          totalRow: managedEvents.data.totalEvent,
          eventInfo: SortManagedEvent(
            formatManagedEvents(managedEvents.data.eventList)
          ),
          page: action.payload.searchPayload.page
        })
      );
    }

    if (hasSucceed && fromEventQueue)
      yield put(
        eventStatisticsActions.updateIsBlackListSuccess({
          eventId: eventId[0],
          is_blackList,
          isFromCountdown,
          isFromRemonitorPresaleTable
        })
      );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* updateIsMonitorSaga(action) {
  const { body, row, extraData } = action.payload;

  try {
    const { data: hasSucceed } = yield call(api.updateIsMonitor, body);
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Event Monitor Started SuccessFully!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with Event Monitor! "
          })
        );
    if (hasSucceed)
      yield put(
        eventStatisticsActions.updateIsMonitorSuccess({ row, extraData, body })
      );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* FetchBlackListPriceSectionSaga(action) {
  const { eventId } = action.payload;
  try {
    yield put(appActions.blackListStartFetching());
    const { data } = yield call(api.fetchBlackListPriceSection, eventId);
    yield put(actions.fetchBlackListPriceSectionSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401)
      yield put(
        appActions.appReceiveError({
          message: `Event not found ! Please Try another event!`
        })
      );
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.blackListStopFetching());
  }
}

function* addBlackListPriceSectionSaga(action) {
  const { eventId, body } = action.payload;
  try {
    yield put(appActions.addBlackListStartFetching());
    const { data: ok } = yield call(
      api.addBlackListPriceSection,
      eventId,
      body
    );
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Event Status Updated Successfully !"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong! Please try again "
          })
        );
    const { data } = yield call(
      api.fetchBlackListPriceSection,
      eventId,
      body.blackListData
    );
    yield put(actions.fetchBlackListPriceSectionSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 401)
      yield put(
        appActions.appReceiveError({
          message: `Event not found ! Please Try another event!`
        })
      );
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.addBlackListStopFetching());
  }
}

function* fetchDuplicateEventQueueSaga(action) {
  try {
    yield put(appActions.duplicateEventStartFetching());
    const {
      data: { data, success }
    } = yield call(
      api.fetchDuplicateEvents,
      action.payload.page,
      action.payload.limit,
      action.payload.filter
    );

    success === true
      ? yield put(
          actions.fetchDuplicateEventsSuccess({
            duplicateEvents: formatEvents(data.duplicateEvents),
            totalEvent: data.totalEvent,
            page: action.payload.page
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong! Please try again "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.duplicateEventStopFetching());
  }
}

function* deleteDuplicateEventSaga(action) {
  try {
    action.payload.fromMisMatch
      ? yield put(appActions.misMatchedEventStartFetching())
      : yield put(appActions.duplicateEventStartFetching());

    const {
      data: { success }
    } = yield call(api.deleteDuplicateEvents, action.payload.Ids);

    if (success === true) {
      yield put(
        appActions.appReceiveAlert({
          message: `${
            action.payload.fromMisMatch ? "MisMatched" : "Duplicate"
          } event deleted successfully!`
        })
      );
      if (action.payload.fromMisMatch) {
        const { data } = yield call(
          eventStatisticsApi.fetchMisMatchedEventQueue,
          action.payload.page || 1,
          20
        );

        yield put(
          eventStatisticsActions.fetchMisMatchedEventQueueSuccess({
            misMatchedEvents: formatEvents(data.data.misMatchedEvents),
            totalEvent: data.data.totalEvent,
            page: action.payload.page || 1
          })
        );
      } else {
        const {
          data: { data, success }
        } = yield call(api.fetchDuplicateEvents, action.payload.page || 1, 20);

        success === true
          ? yield put(
              actions.fetchDuplicateEventsSuccess({
                duplicateEvents: formatEvents(data.duplicateEvents),
                totalEvent: data.totalEvent,
                page: action.payload.page || 1
              })
            )
          : yield put(
              appActions.appReceiveAlert({
                message: "Something went wrong! Please try again "
              })
            );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong! Please try again "
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.misMatchedEventStopFetching());
    yield put(appActions.duplicateEventStopFetching());
  }
}

function* archiveEventSaga(action) {
  try {
    const {
      data: { success }
    } = yield call(api.archiveEvents, action.payload.Ids);

    if (success === true) {
      if (action.payload.fromDuplicate) {
        const {
          data: { data, success }
        } = yield call(
          api.fetchDuplicateEvents,
          action.payload.page || 1,
          20,
          action.payload.filter
        );

        success === true
          ? yield put(
              actions.fetchDuplicateEventsSuccess({
                duplicateEvents: formatEvents(data.duplicateEvents),
                totalEvent: data.totalEvent,
                page: action.payload.page || 1
              })
            )
          : yield put(
              appActions.appReceiveAlert({
                message: "Something went wrong! Please try again "
              })
            );
      } else if (action.payload.fromMisMatched) {
        const { data } = yield call(
          eventStatisticsApi.fetchMisMatchedEventQueue,
          action.payload.page || 1,
          20,
          action.payload.filter
        );
        yield put(
          eventStatisticsActions.fetchMisMatchedEventQueueSuccess({
            misMatchedEvents: formatEvents(data.data.misMatchedEvents),
            totalEvent: data.data.totalEvent,
            page: action.payload.page || 1
          })
        );
      } else {
        const { data } = yield call(
          eventStatisticsApi.fetchUnmatchedEventQueue,
          action.payload.page,
          20,
          action.payload.filter
        );
        yield put(
          eventStatistiActions.fetchUnmatchedEventQueueSuccess({
            unmatchedEventsAdded: formatEvents(data.data.unmatchedEventsAdded),
            totalListing: data.data.totalEvent,
            page: action.payload.page
          })
        );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong! Please try again "
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* updateEventBySkyboxEventIdSaga(action) {
  try {
    action.payload.fromMisMatch
      ? yield put(appActions.misMatchedEventStartFetching())
      : yield put(appActions.duplicateEventStartFetching());

    const {
      data: { success, message }
    } = yield call(api.updateEventBySkyboxEventId, action.payload.data);

    if (success === true) {
      yield put(
        appActions.appReceiveAlert({
          message: "Event updated successfully."
        })
      );

      if (action.payload.fromMisMatch) {
        const { data } = yield call(
          eventStatisticsApi.fetchMisMatchedEventQueue,
          action.payload.page || 1,
          20
        );

        yield put(
          eventStatisticsActions.fetchMisMatchedEventQueueSuccess({
            misMatchedEvents: formatEvents(data.data.misMatchedEvents),
            totalEvent: data.data.totalEvent,
            page: action.payload.page || 1
          })
        );
      } else if (action.payload.hasOwnProperty("isFromCountdown")) {
        yield put(
          eventStatisticsActions.updateBySkyboxEventIdFromEventQueueSuccess(
            action.payload
          )
        );
      } else {
        const {
          data: { data, success }
        } = yield call(api.fetchDuplicateEvents, action.payload.page || 1, 20);

        success === true
          ? yield put(
              actions.fetchDuplicateEventsSuccess({
                duplicateEvents: formatEvents(data.duplicateEvents),
                totalEvent: data.totalEvent,
                page: action.payload.page || 1
              })
            )
          : yield put(
              appActions.appReceiveAlert({
                message: "Something went wrong! Please try again "
              })
            );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: message || "Something went wrong! Please try again "
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else if (error.response.status === 400) {
      yield put(
        appActions.appReceiveError({
          message:
            error.response.data.message ||
            "Something went wrong! Please try again "
        })
      );
    } else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.misMatchedEventStopFetching());
    yield put(appActions.duplicateEventStopFetching());
  }
}

function* watchEventsSaga() {
  yield takeLatest(
    actions.fetchEventsByKeywordRequest,
    fetchEventsByKeywordSaga
  );

  yield takeLatest(actions.FETCH_PRICE_POINT_REQUEST, fetchPricePointSaga);

  yield takeLatest(
    actions.FETCH_SECONDARY_MARKET_LOGS_REQUEST,
    fetchSecondaryMargetLogsSaga
  );
  yield takeLatest(actions.FETCH_EVENT_BY_EVENTID_REQUEST, fetchEventByIdSaga);
  yield takeEvery(
    actions.fetchEventDetailsLogRequest,
    fetchEventDetailsLogSaga
  );

  yield takeEvery(
    actions.fetchRePriceEventLogRequest,
    fetchRePriceEventLogSaga
  );

  yield takeEvery(actions.searchSkyboxVenueIdRequest, searchSkyboxVenueIdSaga);

  yield takeEvery(
    actions.fetchManagedEventsByKeywordRequest,
    fetchManagedEventsByKeywordSaga
  );

  yield takeEvery(
    actions.fetchEventInfoByEventIdRequest,
    fetchEventInfoByEventIdSaga
  );

  //Managed Events
  yield takeEvery(actions.createManagedEventsRequest, searchSkyboxEventsSaga);

  yield takeEvery(
    actions.createManagedQueueEventsRequest,
    searchSkyboxQueueEventsSaga
  );
  yield takeEvery(actions.fetchManagedEventsRequest, fetchManagedEventsSaga);

  yield takeEvery(actions.deleteManagedEventsRequest, deleteManagedEventsSaga);

  yield takeEvery(actions.updateManagedEventsRequest, updateManagedEventsSaga);

  yield takeEvery(actions.userOverrideAvaiRequest, userOverrideAvailSaga);

  yield takeEvery(
    actions.fetchManagedEventsFilterRequest,
    fetchManagedEventsFilterSaga
  );

  yield takeEvery(
    actions.fetchManagedEventsSearchRequest,
    fetchManagedEventsSearchSaga
  );

  //Events queue
  yield takeLatest(
    actions.fetchManagedEventsQueueRequest,
    fetchManagedEventsQueueSaga
  );

  yield takeEvery(
    actions.addManagedEventFromQueueRequest,
    addManagedEventFromQueueSaga
  );

  yield takeEvery(
    actions.deleteManagedEventsQueueRequest,
    deleteManagedEventsQueueSaga
  );

  yield takeEvery(
    actions.updatePriceMarkUpPctRequest,
    updatePriceMarkUpPctSaga
  );

  yield takeEvery(
    actions.bulkUpdatePriceMarkUpPctRequest,
    bulkUpdatePriceMarkupPctSaga
  );

  yield takeEvery(
    actions.fetchEventsPerformersRequest,
    getEventsPerformersSaga
  );

  yield takeEvery(actions.updateIsBlackListRequest, updateIsBlackListSaga);
  //blackList_Section
  yield takeEvery(
    actions.FetchBlackListPriceSectionRequest,
    FetchBlackListPriceSectionSaga
  );

  yield takeEvery(
    actions.addBlackListPriceSectionRequest,
    addBlackListPriceSectionSaga
  );

  //is_Monitor
  yield takeEvery(actions.updateIsMonitorRequest, updateIsMonitorSaga);

  // available_offers
  yield takeEvery(actions.fetchAvailableOfferRequest, fetchAvailableOffersSaga);

  //duplicate events
  yield takeEvery(
    actions.fetchDuplicateEventsRequest,
    fetchDuplicateEventQueueSaga
  );
  yield takeEvery(
    actions.deleteDuplicateEventsRequest,
    deleteDuplicateEventSaga
  );
  yield takeEvery(
    actions.updateEventBySkyboxEventIdRequest,
    updateEventBySkyboxEventIdSaga
  );

  yield takeEvery(actions.archiveEventsRequest, archiveEventSaga);
}

export default watchEventsSaga;

/* eslint-disable no-unused-vars */
import { takeEvery, call, put, all } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/promos";
import * as eventStatisticsActions from "../actions/eventStatistic";
import * as userActions from "../actions/users";
import * as api from "../api/promos";
import * as eventActions from "../actions/events";
import { dateFormatterWithTZ } from "../utils";
const formatPromos = data => {
  return data.reduce(
    (accu, promo) => {
      const { _id } = promo;

      accu["ids"].push(_id);
      accu.dict[_id] = promo;

      return accu;
    },
    {
      ids: [],
      dict: {}
    }
  );
};

const formatEventPromos = data => {
  var jsonObj = [];
  var item = {};
  for (var j = 0; j < data.length; j++) {
    var promoName = Object.keys(data[j].promos);
    var promoCode = Object.values(data[j].promos);
    item["_id"] = data[j]._id;
    item["eventDate"] = data[j].eventDate;
    item["eventId"] = data[j].eventId;
    item["promoName"] = promoName;
    item["promoCode"] = promoCode;
    item["promos"] = data[j].promos;
    jsonObj.push(item);
    item = {};
  }
  return jsonObj.map(
    ({ eventId, eventDate, promoName, promoCode, _id, promos }) => ({
      eventId,
      eventDate: dateFormatterWithTZ(eventDate)(),
      promoName,
      promoCode,
      _id,
      promos
    })
  );
};

function* fetchPromosSaga() {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchPromos);

    yield put(actions.fetchPromosSuccess(formatPromos(data.data.PromoList)));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* addPRomoSaga(action) {
  try {
    const { data } = yield call(api.addPromo, action.payload);
    data
      ? yield put(
          appActions.appReceiveAlert({
            message: "Successfully added!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong!"
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* deletePRomoSaga(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(api.deletePromos, action.payload);
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* fetchEventPromosSaga() {
  try {
    yield put(appActions.eventPromoStartFetching());
    const { data } = yield call(api.fetchEventPromos);
    yield put(
      actions.fetchEventPromosSuccess(formatEventPromos(data.data.eventList))
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.eventPromoStopFetching());
  }
}

const formatAvailablePromos = data => {
  var availablePromosObject = [];
  var item = {};
  for (var i = 0; i < Object.keys(data).length; i++) {
    var promoName = Object.keys(data)[i];
    var eventId = Object.values(data)[i];
    item["eventId"] = eventId;
    item["promoName"] = promoName;
    availablePromosObject.push(item);
    item = {};
  }
  return availablePromosObject;
};

function* fetchAvailableEventPromosSaga() {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchAvailableEventPromos);
    yield put(
      actions.fetchAvailableEventPromosSuccess(data.data.availableOffersList)
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventAvailablePromosSaga(action) {
  yield put(appActions.eventAvailablePromoStartFetching());
  try {
    const { data } = yield call(api.fetchEventAvailablePromos, action.payload);
    yield put(actions.fetchEventAvailablePromoSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.eventAvailablePromoStopFetching());
    // yield put(appActions.appStopFetching())
  }
}

function* addEventPromoSaga(action) {
  try {
    const {
      isCommingFromQueuePage,
      isComingFromManagedEvents,
      isComingFromEventPromo,
      isComingFromAddNewEventPromo
    } = action.payload;

    if (isCommingFromQueuePage) {
      yield call(api.addEventPromo, action.payload);
      yield put(
        appActions.appReceiveAlert({
          message: "Promo Code Updated SuccessFully !"
        })
      );
      yield put(eventStatisticsActions.addEventPromoSuccess(action.payload));
    } else if (isComingFromManagedEvents) {
      yield call(api.addEventPromo, action.payload);
      yield put(
        appActions.appReceiveAlert({
          message: "Promo Code Updated SuccessFully !"
        })
      );
      yield put(eventActions.managedEventsAddPromoSuccess(action.payload));
    } else if (isComingFromEventPromo) {
      yield call(api.addEventPromo, action.payload);
      yield put(
        appActions.appReceiveAlert({
          message: "Promo Code Updated SuccessFully !"
        })
      );
      yield put(actions.addPromoSuccess(action.payload));
    } else if (isComingFromAddNewEventPromo) {
      yield call(api.addEventPromo, action.payload);
      yield put(
        appActions.appReceiveAlert({
          message: "Promo Code Updated SuccessFully !"
        })
      );
      yield put(actions.addPromoSuccess(action.payload));
    }
  } catch (error) {
    console.log("error", error);
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
    yield put(appActions.eventByPrmomoNameStopFetching());
    yield put(appActions.eventPromoStopFetching());
  }
}

function* deleteEventPromoFromPromotionSaga(action) {
  // const { isCommingFromQueuePage } = action.payload
  action.payload.isPromoDeleted = true;

  try {
    const { data } = yield call(
      api.deleteEventPromoFromPromotion,
      action.payload
    );
    data.status === "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Promo Code Deleted SuccessFully !"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong! Please try again!"
          })
        );

    // if (isCommingFromQueuePage) {
    //   yield put(eventStatisticsActions.addEventPromoSuccess(action.payload))
    // }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* deleteEventPromoFromAddPromoSaga(action) {
  const { isCommingFromQueuePage } = action.payload;
  const { isComingFromManagedEvents } = action.payload;
  const { isComingFromEventPromo } = action.payload;

  action.payload.isPromoDeleted = true;

  try {
    const { data } = yield call(
      api.deleteEventPromoFromAddPromo,
      action.payload
    );

    data.status === "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Promo Code Deleted SuccessFully !"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong! Please try again!"
          })
        );
    if (isCommingFromQueuePage) {
      yield put(eventStatisticsActions.addEventPromoSuccess(action.payload));
    }
    if (isComingFromManagedEvents) {
      yield put(eventActions.managedEventsAddPromoSuccess(action.payload));
    }
    if (isComingFromEventPromo) {
      yield put(actions.addPromoSuccess(action.payload));
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* fetchEventsByPromoNameSaga(action) {
  yield put(appActions.eventByPrmomoNameStartFetching());
  try {
    const { data } = yield call(api.fetchEventByPromoName, action.payload);
    yield put(actions.fetchEventsByPromoNameSuccess(data.data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.eventByPrmomoNameStopFetching());
    // yield put(appActions.appStopFetching())
  }
}

function* watchPromoSaga() {
  yield takeEvery(actions.FETCH_PROMOS_REQUEST, fetchPromosSaga);
  yield takeEvery(actions.FETCH_EVENT_PROMOS_REQUEST, fetchEventPromosSaga);
  yield takeEvery(
    actions.FETCH_AVAILABLE_EVENT_PROMOS_REQUEST,
    fetchAvailableEventPromosSaga
  );
  yield takeEvery(actions.ADD_PROMO_REQUEST, addPRomoSaga);
  yield takeEvery(actions.DELETE_PROMOS_REQUEST, deletePRomoSaga);
  yield takeEvery(actions.ADD_EVENT_PROMO_REQUEST, addEventPromoSaga);
  yield takeEvery(
    actions.DELETE_EVENT_PROMOS_FROM_PROMOTION_REQUEST,
    deleteEventPromoFromPromotionSaga
  );
  yield takeEvery(
    actions.DELETE_EVENT_PROMOS_FROM_ADD_PROMO_REQUEST,
    deleteEventPromoFromAddPromoSaga
  );
  yield takeEvery(
    actions.FETCH_EVENT_AVAILABLE_PROMOS_REQUEST,
    fetchEventAvailablePromosSaga
  );
  yield takeEvery(
    actions.FETCH_EVENT_BY_PROMOS_REQUEST,
    fetchEventsByPromoNameSaga
  );
}

export default watchPromoSaga;

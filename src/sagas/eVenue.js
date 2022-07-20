import { call, put, takeEvery } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/eVenue";
import * as userActions from "../actions/users";
import * as api from "../api/eVenue";
import * as apiVenues from "../api/venues";

//E-venue
function* createEVenueSaga(action) {
  const eVenue = action.payload;

  try {
    const {
      data: { success }
    } = yield call(api.createEVenue, [eVenue]);

    success
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating E-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating E-Venue!"
          })
        );
    const { data } = yield call(api.fetchEVenue, {
      typeKey: "evenue",
      limit: 20,
      page: 1
    });
    yield put(
      actions.fetchEVeuneSuccess({
        evenues: data.data.venueList,
        totalVenues: data.data.totalVenues,
        page: 1
      })
    );
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error));
    } else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else {
      yield put(appActions.appReceiveError(error));
    }
  } finally {
  }
}

function* fetchEVenueSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchEVenue, action.payload);
    yield put(
      actions.fetchEVeuneSuccess({
        evenues: data.data.venueList,
        totalVenues: data.data.totalVenues,
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

function* deleteEVenueSaga(action) {
  const { venueId } = action.payload;
  try {
    const {
      data: { ok }
    } = yield call(api.deleteEVenue, venueId);

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting E-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting E-Venue!"
          })
        );
    const { data } = yield call(api.fetchEVenue, {
      typeKey: "evenue",
      limit: 20,
      page: 1
    });
    yield put(
      actions.fetchEVeuneSuccess({
        evenues: data.data.venueList,
        totalVenues: data.data.totalVenues,
        page: action.payload.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* updateEVenueBlacklistSaga(action) {
  const { venueId, is_blackList } = action.payload;

  try {
    const { data: hasSucceed } = yield call(
      apiVenues.updateVenueIsBlackListed,
      venueId,
      is_blackList
    );
    // yield put(eventStatisticsActions.fetchEventMonitorRequest())
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Evenue Successfully Updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of evenue! "
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

function* updateEVenueSaga(action) {
  const newVenue = action.payload;
  if (!newVenue.venueId && newVenue.type.toLoweCase() === "evenue")
    newVenue.venueId = newVenue.url.split(".")[1];

  try {
    const {
      data: { ok }
    } = yield call(api.updateEVenue, newVenue, newVenue.venueId);

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating E-venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating E-venue!"
          })
        );
    const { data } = yield call(api.fetchEVenue);
    yield put(
      actions.fetchEVeuneSuccess({
        evenues: data.data.venueList,
        totalVenues: data.data.totalVenues,
        page: action.payload.page
      })
    );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* watchVenuesSaga() {
  yield takeEvery(actions.createEVenueRequest, createEVenueSaga);

  yield takeEvery(actions.fetchEVenueRequest, fetchEVenueSaga);

  yield takeEvery(actions.deleteEVenueRequest, deleteEVenueSaga);

  yield takeEvery(actions.updateEVenueRequest, updateEVenueSaga);
  yield takeEvery(
    actions.updateIsBlackListEvenueRequest,
    updateEVenueBlacklistSaga
  );
}

export default watchVenuesSaga;

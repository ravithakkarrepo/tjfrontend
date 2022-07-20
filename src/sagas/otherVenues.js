import { call, put, takeEvery } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/otherVenues";
import * as userActions from "../actions/users";
import * as api from "../api/otherVenues";
import * as apiVenues from "../api/venues";

function* createOtherVenueSaga(action) {
  const eVenue = action.payload;

  try {
    const {
      data: { success }
    } = yield call(api.createOtherVenue, [eVenue]);

    success
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating Other-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating Other-Venue!"
          })
        );
    const { data } = yield call(api.fetchOtherVenues, {
      typeKey: "other",
      limit: 20,
      page: 1
    });
    yield put(
      actions.fetchOtherVenuesSuccess({
        othervenues: data.data.venueList,
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

function* fetchOtherVenuesSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchOtherVenues, action.payload);
    yield put(
      actions.fetchOtherVenuesSuccess({
        othervenues: data.data.venueList,
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

function* updateOtherVenueSaga(action) {
  const newVenue = action.payload;
  // if (!newVenue.venueId && newVenue.type.toLoweCase() === "evenue")
  //   newVenue.venueId = newVenue.url.split(".")[1]

  try {
    const {
      data: { ok }
    } = yield call(api.updateOtherVenue, newVenue, newVenue.venueId);

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating other-venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating other-venue!"
          })
        );
    const { data } = yield call(api.fetchOtherVenues);
    yield put(
      actions.fetchOtherVenuesSuccess({
        othervenues: data.data.venueList,
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

function* deleteOtherVenue(action) {
  const { venueId } = action.payload;
  try {
    const {
      data: { ok }
    } = yield call(api.deleteOtherVenue, venueId);

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting Other-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting Other-Venue!"
          })
        );
    const { data } = yield call(api.fetchOtherVenues, {
      typeKey: "other",
      limit: 20,
      page: 1
    });
    yield put(
      actions.fetchOtherVenuesSuccess({
        othervenues: data.data.venueList,
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

function* updateOtherVenueBlacklistSaga(action) {
  const { venueId, is_blackList } = action.payload;

  try {
    const { data: hasSucceed } = yield call(
      apiVenues.updateVenueIsBlackListed,
      venueId,
      is_blackList
    );
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "OtherVenue Successfully Updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of OtherVenue! "
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

function* watchOtherVenuesSaga() {
  yield takeEvery(actions.createOtherVenueRequest, createOtherVenueSaga);

  yield takeEvery(actions.fetchOtherVenuesRequest, fetchOtherVenuesSaga);

  yield takeEvery(actions.deleteOtherVenueRequest, deleteOtherVenue);

  yield takeEvery(actions.updateOtherVenueRequest, updateOtherVenueSaga);
  yield takeEvery(
    actions.updateIsBlackListOtherVenueRequest,
    updateOtherVenueBlacklistSaga
  );
}

export default watchOtherVenuesSaga;

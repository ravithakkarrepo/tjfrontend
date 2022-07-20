import { takeLatest, takeEvery, call, put } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/logs";
import * as userActions from "../actions/users";
import * as api from "../api/logs";

function* fetchEventsLogSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchEventsLog, action.payload);
    yield put(actions.fetchEventsLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchLogDetailsSaga(action) {
  const { instanceId, eventId } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchLogDetails, instanceId, eventId);

    yield put(actions.fetchEventsLogDetailsSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchMediumTermLogSaga() {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchMediumTermLog);

    yield put(actions.fetchMediumTermEventsLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchLongTermLogSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchLongTermLog, action.payload);
    yield put(actions.fetchLongTermEventsLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchViewLogSaga(action) {
  const { type, date, time } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchViewLog, type, date, time);

    yield put(actions.fetchViewLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchDownLoadLogSaga(action) {
  const { type, date, time, instanceId } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.downloadInstanceDetailsLog,
      type,
      date,
      time,
      instanceId
    );

    yield put(actions.fetchInstanceLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchFailedEventLogSaga(action) {
  const { type, date, time, instanceTimestamp, instanceId } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.getFailedEventDetailsLog,
      type,
      date,
      time,
      instanceTimestamp,
      instanceId
    );

    yield put(actions.fetchFailedEventLogSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventsLogInfoSaga(action) {
  const { startDate, endDate } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchEventsLogInfo, startDate, endDate);
    yield put(actions.fetchEventsLogInfoSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* createTriggerAlertForEventsSaga(action) {
  const {
    percentage,
    minPriceQnty,
    days,
    alertName,
    is_check_decrease
  } = action.payload;
  // return;
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { success, message }
    } = yield call(
      api.createTriggerAlertForEvents,
      Number(days),
      Number(minPriceQnty),
      Number(percentage),
      alertName,
      Boolean(is_check_decrease)
    );

    if (success) {
      yield put(
        appActions.appReceiveAlert({
          message: message
        })
      );
      const {
        data: { success, data }
      } = yield call(api.fetchTriggerAlertForEvents);

      success
        ? yield put(actions.fetchTriggerAlertForEventsSuccess(data))
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with fetching an alert!"
            })
          );

      const {
        data: { success: successAlertInfo, data: dataAlertInfo }
      } = yield call(api.fetchAllAlertInfoTypes);

      successAlertInfo
        ? yield put(actions.fetchAllAlertInfosSuccess(dataAlertInfo))
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with fetching an alert!"
            })
          );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with creating an alert!"
        })
      );
    }
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
    yield put(appActions.appStopFetching());
  }
}

function* fetchTriggerAlertForEventsSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { success, data }
    } = yield call(api.fetchTriggerAlertForEvents);

    success
      ? yield put(actions.fetchTriggerAlertForEventsSuccess(data))
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with fetching an alert!"
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
    yield put(appActions.appStopFetching());
  }
}

function* fetchAllAlertInfoSaga() {
  try {
    const {
      data: { success, data }
    } = yield call(api.fetchAllAlertInfoTypes);

    success
      ? yield put(actions.fetchAllAlertInfosSuccess(data))
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with fetching an alert!"
          })
        );
  } catch (error) {
    console.log(`error::`, error);
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error));
    } else if (error.response.status === 401) {
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else {
      yield put(appActions.appReceiveError(error));
    }
  } finally {
    yield put(actions.alertInfosStopFetching());
  }
}

function* updateAlertInfoSaga(action) {
  try {
    if (action.payload.body.hasOwnProperty("_id"))
      delete action.payload.body._id;

    const {
      data: { success, message }
    } = yield call(api.updateAlertInfo, action.payload.Id, action.payload.body);

    if (success) {
      yield put(
        appActions.appReceiveAlert({
          message
        })
      );

      const {
        data: { success, data }
      } = yield call(api.fetchAllAlertInfoTypes);

      success
        ? yield put(actions.fetchAllAlertInfosSuccess(data))
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with creating an alert!"
            })
          );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with creating an alert!"
        })
      );
    }
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
    yield put(actions.alertInfosStopFetching());
  }
}

function* deleteAlertInfoSaga(action) {
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { success, message }
    } = yield call(api.deleteAlertInfo, action.payload.Ids);

    if (success) {
      yield put(
        appActions.appReceiveAlert({
          message
        })
      );

      const {
        data: { success, data }
      } = yield call(api.fetchAllAlertInfoTypes);

      success
        ? yield put(actions.fetchAllAlertInfosSuccess(data))
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with creating an alert!"
            })
          );

      const {
        data: { success: successAlertInfo, data: dataAlertInfo }
      } = yield call(api.fetchTriggerAlertForEvents);

      successAlertInfo
        ? yield put(actions.fetchTriggerAlertForEventsSuccess(dataAlertInfo))
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with fetching an alert!"
            })
          );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with creating an alert!"
        })
      );
    }
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
    yield put(actions.alertInfosStopFetching());
    yield put(appActions.appStopFetching());
  }
}

function* watchLogsSaga() {
  yield takeEvery(actions.fetchEventsLogRequest, fetchEventsLogSaga);
  yield takeEvery(actions.fetchEventsLogDetailsRequest, fetchLogDetailsSaga);
  yield takeEvery(
    actions.fetchMediumTermEventsLogRequest,
    fetchMediumTermLogSaga
  );
  yield takeEvery(actions.fetchLongTermEventsLogRequest, fetchLongTermLogSaga);
  yield takeEvery(actions.fetchViewLogRequest, fetchViewLogSaga);
  yield takeEvery(actions.fetchInstanceLogRequest, fetchDownLoadLogSaga);
  yield takeEvery(actions.fetchFailedEventLogRequest, fetchFailedEventLogSaga);
  yield takeLatest(actions.fetchEventsLogInfoRequest, fetchEventsLogInfoSaga);
  yield takeEvery(
    actions.createTriggerAlertForEventsRequest,
    createTriggerAlertForEventsSaga
  );
  yield takeEvery(
    actions.fetchTriggerAlertForEventsRequest,
    fetchTriggerAlertForEventsSaga
  );
  yield takeEvery(actions.fetchAllAlertInfosRequest, fetchAllAlertInfoSaga);
  yield takeEvery(actions.updateAlertInfoRequest, updateAlertInfoSaga);
  yield takeEvery(actions.deleteAlertInfoRequest, deleteAlertInfoSaga);
}

export default watchLogsSaga;

import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import * as appActions from "../actions/app";
import * as userActions from "../actions/users";
import * as actions from "../actions/healthReport";
import * as api from "../api/healthReport";

function* fetchSaleMarginHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { searchType } = action.payload;
    const { data } = yield call(
      api.fetchSaleMarginHealthReport,
      action.payload
    );
    yield put(
      actions.fetchSaleMarginHealthReportSuccess({
        data: data.data,
        searchType
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

function* fetchMarketwiseSaleMarginHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { searchType } = action.payload;
    const { data } = yield call(
      api.fetchMarketwiseSaleMarginHealthReport,
      action.payload
    );
    yield put(
      actions.fetchMarketwiseSaleMarginHealthReportSuccess({
        data: data.data,
        searchType
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

function* fetchSBEventsHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchSkyboxEventsHealthReport,
      action.payload
    );
    yield put(actions.fetchSBEventsHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchSBPostedEventsHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const monitorType = action.payload.monitorType;
    const { data } = yield call(
      api.fetchSkyboxPostedEventsHealthReport,
      action.payload
    );
    yield put(
      actions.fetchSBPostedEventsHealthReportSuccess({
        data: data.data,
        monitorType
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

function* fetchSBPostedPresaleEventsHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchSkyboxPostedPresaleEventsHealthReport,
      action.payload
    );
    yield put(actions.fetchSBPostedPresaleEventsHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventQueueHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchEventQueueHealthReport,
      action.payload
    );
    yield put(actions.fetchEventQueueHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchCancelledSBEventsHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchCancelledSkyboxEventsHealthReport,
      action.payload
    );
    yield put(actions.fetchCancelledSBEventsHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchUpdateHealthReportConfigSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data, status } = yield call(
      api.fetchUpdateHealthReportConfig,
      action.payload
    );
    if (status === 200) {
      yield put(actions.fetchUpdateHealthReportConfigSuccess(data));
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed updating a health report configration!"
        })
      );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message:
            "Something went wrong with updating a health report configration! "
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

function* fetchPresaleEventsHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchPresaleEventsHealthReport,
      action.payload
    );
    yield put(actions.fetchPresaleEventsHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEventMonitoringHealthReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.fetchEventMonitoringHealthReport,
      action.payload
    );
    yield put(actions.fetchEventMonitoringHealthReportSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* watchHealthReportSaga() {
  yield takeEvery(
    actions.FETCH_SALE_MARGIN_HEALTH_REPORT_REQUEST,
    fetchSaleMarginHealthReportSaga
  );

  yield takeEvery(
    actions.FETCH_MARKETWISE_SALE_MARGIN_HEALTH_REPORT_REQUEST,
    fetchMarketwiseSaleMarginHealthReportSaga
  );

  yield takeLatest(
    actions.FETCH_SB_EVENTS_HEALTH_REPORT_REQUEST,
    fetchSBEventsHealthReportSaga
  );

  yield takeEvery(
    actions.FETCH_SB_POSTED_EVENTS_HEALTH_REPORT_REQUEST,
    fetchSBPostedEventsHealthReportSaga
  );

  yield takeLatest(
    actions.FETCH_SB_POSTED_PRESALE_EVENTS_HEALTH_REPORT_REQUEST,
    fetchSBPostedPresaleEventsHealthReportSaga
  );

  yield takeLatest(
    actions.FETCH_EVENT_QUEUE_HEALTH_REPORT_REQUEST,
    fetchEventQueueHealthReportSaga
  );

  yield takeLatest(
    actions.FETCH_CANCELLED_SB_EVENTS_HEALTH_REPORT_REQUEST,
    fetchCancelledSBEventsHealthReportSaga
  );

  yield takeEvery(
    actions.FETCH_UPDATE_HEALTH_REPORT_CONFIG_REQUEST,
    fetchUpdateHealthReportConfigSaga
  );

  yield takeLatest(
    actions.FETCH_PRESALE_EVENTS_HEALTH_REPORT_REQUEST,
    fetchPresaleEventsHealthReportSaga
  );

  yield takeEvery(
    actions.FETCH_EVENT_MONITORING_HEALTH_REPORT_REQUEST,
    fetchEventMonitoringHealthReportSaga
  );
}

export default watchHealthReportSaga;

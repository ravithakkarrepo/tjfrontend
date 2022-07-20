import { takeEvery, call, put } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/globalConfig";
import * as userActions from "../actions/users";
import * as api from "../api/globalConfig";
import { isObject } from "../utils/validation";

const formatedData = globals => {
  return Object.keys(globals).map(key => ({
    keyName: key,
    value: isObject(globals[key]) ? JSON.stringify(globals[key]) : globals[key]
  }));
};

const formatedTabData = global_Tab => {
  var newGlobalData = [];
  for (var globals of Object.entries(
    Object.entries(global_Tab).map(data => data[1])
  )) {
    newGlobalData.push({
      tabName: Object.keys(globals[1])[0],
      tabData: Object.values(globals[1])[0]
    });
  }
  return newGlobalData;
};

function* fetchGlobalConfigsSaga() {
  try {
    const { data } = yield call(api.fetchGlobals);
    yield put(actions.fetchGlobalConfigSuccess(formatedData(data.data)));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* fetchGlobaltabConfigsSaga() {
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.fetchGlobals_Tab);
    yield put(actions.fetchGlobal_tab_ConfigSuccess(formatedTabData(data)));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}
function* deleteGlobalConfigsSaga(action) {
  // const { tabName } = action.payload
  try {
    const { data: ok } = yield call(api.deleteGlobalConfigs, action.payload);
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting a global configration!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message:
              "Something went wrong with deleting a global configration! "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* updateGlobalConfigsSaga(action) {
  let globalKey = action.payload;
  try {
    const { data: ok } = yield call(api.updateGlobalConfig, globalKey);
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a global configration!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message:
              "Something went wrong with updating a global configration! "
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* addGlobalConfigsSaga(action) {
  try {
    const { data: ok } = yield call(api.addGlobalConfigs, action.payload);
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating a global configration!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message:
              "Something went wrong with creating a global configration! "
          })
        );
    yield put(actions.fetchGlobal_tab_ConfigRequest());
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* watchGlobalConfigSaga() {
  yield takeEvery(actions.fetchGlobalConfigRequest, fetchGlobalConfigsSaga);
  yield takeEvery(actions.deleteGlobalConfigRequest, deleteGlobalConfigsSaga);
  yield takeEvery(actions.updateGlobalConfigRequest, updateGlobalConfigsSaga);
  yield takeEvery(actions.addGlobalConfigRequest, addGlobalConfigsSaga);
  yield takeEvery(
    actions.fetchGlobal_tab_ConfigRequest,
    fetchGlobaltabConfigsSaga
  );
}

export default watchGlobalConfigSaga;

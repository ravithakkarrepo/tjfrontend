/* eslint-disable no-unused-vars */
import { call, put, takeEvery } from "redux-saga/effects";

import {
  userAuthorizationFailure,
  userAuthorizationSuccess,
  USER_AUTHORIZATION_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_FOR_BREAK_REQUEST,
  FETCH_JOCKEY_ACCOUNTS_REQUEST,
  fetchUserProfileSuccess,
  fetchJockeyAccountsSuccess,
  USER_LOGOUT_REQUEST,
  USER_AUTHORIZATION_BY_GOOGLE_REQUEST,
  userAuthorizationByGoogleSuccess,
  userAuthorizationByGoogleFailure,
  userLogOut
} from "../actions/users";
import { fetchGlobalSessionConfigSuccess } from "../actions/globalConfig";
import {
  appStartFetching,
  appReceiveError,
  appStopFetching
} from "../actions/app";
import { login, logout, validateUser } from "../api/user";
import { restApiClient } from "../api";
import * as apiUser from "../api/user";
import * as userActions from "../actions/users";
import * as appActions from "../actions/app";

function* userAuthorizationSaga(action) {
  try {
    const { username, password } = action.payload;

    yield put(appStartFetching());

    const { data } = yield call(login, {
      password,
      username
    });

    //add username as a parameter of api request
    restApiClient.defaults.params = {
      ...restApiClient.defaults.params,
      username
    };

    yield put(userAuthorizationSuccess(data));
  } catch (error) {
    yield put(appReceiveError(new Error("Email or Password is wrong!")));
    yield put(userAuthorizationFailure());
  } finally {
    yield put(appStopFetching());
  }
}

function* userLogoutSaga(action) {
  try {
    // const { userId } = action.payload
    yield put(appStartFetching());

    // yield call(logout, {
    //   userId
    // })

    yield put(userLogOut());
  } catch (error) {
    yield put(appReceiveError(new Error("Error occured on logout!")));
    yield put(userLogOut());
  } finally {
    yield put(appStopFetching());
  }
}

function* fetchUserProfileSaga(action) {
  try {
    yield put(appStartFetching());
    const { data } = yield call(apiUser.fetchUserProfile, action.payload);
    yield put(fetchUserProfileSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* fetchAllJockeyAccountsSaga(action) {
  try {
    // yield put(appStartFetching())
    const { data } = yield call(apiUser.fetchAllJockeyAccounts);
    yield put(fetchJockeyAccountsSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* userUpdateProfileSaga(action) {
  try {
    yield put(appActions.updateProfileStartFetching());
    const { data: ok } = yield call(
      apiUser.userUpdateProfile,
      action.payload.body,
      action.payload._id
    );
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Account!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Account!"
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.updateProfileStopFetching());
  }
}

function* updateUserForBreakSaga(action) {
  try {
    // yield put(appActions.updateProfileStartFetching())
    const { data: ok } = yield call(
      apiUser.updateUserForBreak,
      action.payload.userId,
      action.payload.is_break
    );
    yield put(userActions.updateJockeyAccounts({ userInfo: ok.data }));
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Account!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Account!"
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.updateProfileStopFetching());
  }
}

function* userAuthorizationByGoogleSaga(action) {
  try {
    yield put(appStartFetching());

    const { data } = yield call(validateUser, action.payload);

    //add username as a parameter of api request
    restApiClient.defaults.params = {
      ...restApiClient.defaults.params
      // username
    };

    yield put(userAuthorizationByGoogleSuccess(data));
    yield put(fetchGlobalSessionConfigSuccess(data));
  } catch (error) {
    console.log("error", error.response || error);
    yield put(
      appReceiveError(
        new Error(error.response.data.message) ||
          new Error("Email or Password is wrong!")
      )
    );
    yield put(userAuthorizationByGoogleFailure());
  } finally {
    yield put(appStopFetching());
  }
}

function* watchUserSaga() {
  yield takeEvery(USER_AUTHORIZATION_REQUEST, userAuthorizationSaga);
  yield takeEvery(
    USER_AUTHORIZATION_BY_GOOGLE_REQUEST,
    userAuthorizationByGoogleSaga
  );
  yield takeEvery(USER_LOGOUT_REQUEST, userLogoutSaga);
  yield takeEvery(USER_UPDATE_PROFILE_REQUEST, userUpdateProfileSaga);
  yield takeEvery(FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga);
  yield takeEvery(FETCH_JOCKEY_ACCOUNTS_REQUEST, fetchAllJockeyAccountsSaga);
  yield takeEvery(UPDATE_USER_FOR_BREAK_REQUEST, updateUserForBreakSaga);
}

export default watchUserSaga;

import { put, take, call, cancelled, fork, cancel } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { isObject } from "../utils/validation";
// import io from "socket.io-client"
import firebase from "firebase/app";
import "firebase/database";

import * as appActions from "../actions/app";
import * as userActions from "../actions/users";
import * as listingsActions from "../actions/listings";
import * as configActions from "../actions/globalConfig";

import * as configApi from "../api/globalConfig";
import // WEB_SOCKET_URL,
// TYPE_SALE_LISTING,
// TYPE_TRANSFER_LISTING,
// FIRBASE_CONFIG
"../constants";

const formatedData = globals => {
  return Object.keys(globals).map(key => ({
    keyName: key,
    value: isObject(globals[key]) ? JSON.stringify(globals[key]) : globals[key]
  }));
};

// function createSocketChannel(socket) {
//   return eventChannel(emiter => {
//     socket.on("connect", () => {
//       console.log("socket is connecting.....")
//     })

//     socket.on("disconnect", () => {
//       console.log("socket is disconnecting.....")
//     })

//     socket.on("reconnect", () => {
//       console.log("socket is reconnecting.....")
//       emiter({ color: "warn" })
//     })

//     socket.on("new_message", msg => {
//       emiter(msg)
//     })

//     return () => {
//       socket && socket.close()
//     }
//   })
// }
//var firstTime = true
////var alwaysshow = false
function createFirebaseChannel() {
  return eventChannel(emiter => {
    const db = firebase
      .app()
      .database()
      .ref();

    const listener = db.on("child_changed", snapshot => {
      emiter(snapshot.val());
    });

    return () => {
      listener.off();
    };
  });
}

// function* initWebSocketSaga() {
//   try {
//     const webSocket = new io(WEB_SOCKET_URL)

//     yield put(appActions.initWebSocketSuccess(webSocket))

//     const socketChannel = yield call(createSocketChannel, webSocket)

//     while (true) {
//       try {
//         const { dashboardToast, color } = yield take(socketChannel)

//         if (dashboardToast) {
//           yield put(
//             appActions.appReceiveAlert({ message: dashboardToast, type: color })
//           )
//         }

//         yield put(listingsActions.fetchOpenListingsRequest())
//       } catch (error) {
//         if (error.response.status === 403)
//           yield put(userActions.userAuthorizationFailure(error))
//         else yield put(appActions.appReceiveError(error))
//       } finally {
//         if (yield cancelled()) {
//           socketChannel.close()
//         }
//       }
//     }
//   } catch (error) {
//     if (error.response.status === 403)
//       yield put(userActions.userAuthorizationFailure(error))
//     else yield put(appActions.appReceiveError(error))
//   }
// }

function* initFirebaseSaga(action) {
  const userInfo = action.payload;
  try {
    console.log("userInfo :", action.payload);
    if (!firebase.apps.length) {
      const { data } = yield call(configApi.fetchGlobals);
      yield put(
        configActions.fetchGlobalConfigSuccess(formatedData(data.data))
      );

      firebase.initializeApp(data.data.firebaseConfig);
      // firebase
      //   .messaging()
      //   .usePublicVapidKey(
      //     "BJ5SySDqvaLNamj7vGSeG_7PrmcP5jqIKV62OLi7HIzF0sngLZj4XVmcf1ksPsAjBML8zq9tg1LrS9NFUI26UtI"
      //   )
    }
    // if (firebase.messaging.isSupported()) {
    //   if (Notification["permission"] === "granted") {
    //     alwaysshow = true
    //     firstTime = false
    //   } else {
    //     alwaysshow = false
    //     firstTime = true
    //   }
    //   const token = yield firebase.messaging().getToken()
    //   if (token) {
    //     const { data } = yield call(configApi.registerWebBrowsertoken, token)
    //     navigator.serviceWorker.addEventListener("message", message =>
    //       console.log("messageaddby you", message)
    //     )
    //   }
    //   if (firstTime) {
    //     yield put(
    //       appActions.appReceiveAlert({
    //         message: "You have been successfully subscribed"
    //       })
    //     )
    //   }
    //   // const { data } = yield call(
    //   //   configApi.registerToTopic,
    //   //   token,
    //   //   "allTJDevices"
    //   // )
    // }

    const firebaseChannel = yield call(createFirebaseChannel);

    while (true) {
      try {
        const { dashboardToast, color } = yield take(firebaseChannel);

        if (dashboardToast) {
          yield put(
            appActions.appReceiveAlert({ message: dashboardToast, type: color })
          );
        }

        // yield put(listingsActions.fetchOpenListingsRequest())
        yield put(
          listingsActions.fetchOpenSalesRequest({
            username: userInfo.username,
            role: userInfo.role,
            stopSpinner: true
          })
        );
        // yield put(listingsActions.fetchOrderFlowRequest({ stopSpinner: true }))
      } catch (error) {
        if (error.response.status === 403)
          yield put(userActions.userAuthorizationFailure(error));
        else yield put(appActions.appReceiveError(error));
      } finally {
        if (yield cancelled()) {
          firebaseChannel.close();
        }
      }
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* watchWebSocketSaga() {
  while (true) {
    // yield take(appActions.INIT_WEB_SOCKET_REQUEST)
    // const task = yield fork(initWebSocketSaga)

    const action = yield take(appActions.INIT_FIREBASE_REQUEST);
    const firebaseTask = yield fork(initFirebaseSaga, action);

    // yield take(appActions.CLOSE_WEB_SOCKET)
    // cancel(task)

    yield take(appActions.CLOSE_FIREBASE);
    cancel(firebaseTask);
  }
}

export default watchWebSocketSaga;

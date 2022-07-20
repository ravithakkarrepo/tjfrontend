/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { call, put, takeEvery, take } from "redux-saga/effects";

import * as appActions from "../actions/app";
import * as actions from "../actions/venues";
import * as userActions from "../actions/users";
import * as api from "../api/venues";
const formatSearchVenueData = venue => {
  return {
    name: venue.name,
    state: venue.state,
    city: venue.city,
    address: venue.address,
    zip: venue.zip
  };
};

const formatUpdateVenueForSearchSkybox = skyBoxVenue => {
  return {
    skyboxVenueId: skyBoxVenue.id,
    state: skyBoxVenue.state,
    city: skyBoxVenue.city,
    address: skyBoxVenue.address,
    zip: skyBoxVenue.postalCode,
    is_match: true,
    keyword: skyBoxVenue.name
  };
};

const formateVenueData = venues => {
  return venues.map(v => ({
    ...v,
    priceMarkupPct: v.priceMarkupPct ? v.priceMarkupPct : null,
    is_priceMarkupPct: v.is_priceMarkupPct ? v.is_priceMarkupPct : false
  }));
};

//venue
function* createManagedVenueSaga(action) {
  const venue = action.payload;

  try {
    const { data: result } = yield call(api.createManagedVenue, [venue]);

    result.status == "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating mangaed a venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: result.msg
              ? result.msg
              : "Something went wrong with creating a managed venue!"
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

function* fetchManagedVenueSaga() {
  try {
    const { data } = yield call(api.fetchManagedVenue);
    yield put(actions.fetchManagedVeuneSuccess(data));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* fetchManagedVenuePagingSaga(action) {
  const venueRequest = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const { data } = yield call(api.fetchManagedVenueByPaging, venueRequest);
    yield put(
      actions.fetchManagedVeunePagingSuccess({
        totalRow: data.total_rows,
        venueInfo: data.rows,
        page: data.page
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

function* fetchManagedVenueSearchSaga(action) {
  const venueRequest = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const { data: managedVenues } = yield call(
      api.fetchManagedVenueSearch,
      venueRequest
    );
    yield put(
      actions.fetchManagedVeuneSearchSuccess({
        //  totalRow: data.total_rows,
        totalRow: managedVenues.data.totalVenues,
        venueInfo: formateVenueData(managedVenues.data.venueList),
        //venueInfo: data.rows,
        page: action.payload.index
        // bookMarks: managedVenues.bookMark
        // page: data.page
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

function* deleteManagedVenueSaga(action) {
  const { deleteIds } = action.payload;
  try {
    const {
      data: { ok }
    } = yield call(api.deleteManagedVenue, { deleteIds });

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting a mangaed venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a managed venue!"
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* updateManagedVenueSaga(action) {
  const newVenue = action.payload;

  try {
    const { data: result } = yield call(
      api.updateManagedVenue,
      newVenue,
      newVenue._id
    );

    result.status == "success"
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a mangaed venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating a managed venue!"
          })
        );
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

function* updatePriceMarkUpPctForVenueSaga(action) {
  const { venueId, pctValue, isPctValue } = action.payload;
  // newVenue.venueId = newVenue.url.slice(12).replace(".com/", "")
  try {
    const { data } = yield call(api.updatePriceMarkupPctForVenue, venueId, {
      priceMarkupPct: pctValue,
      is_priceMarkupPct: isPctValue
    });

    data.status === "success"
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

function* searchSkyboxVenueSaga(action) {
  const venue = action.payload;
  try {
    const { data } = yield call(
      api.searchSkyboxVenue,
      formatSearchVenueData(venue)
    );
    if (data.length > 0) {
      yield put(actions.OpenSkyboxVenueDupModal(data));
      const { payload: selectedVenue } = yield take(
        actions.SELECT_MODAL_SKYBOX_VENUE
      );
      const { data: result } = yield call(
        api.updateManagedVenue,
        formatUpdateVenueForSearchSkybox(selectedVenue),
        venue._id
      );
      // yield put(actions.fetchManagedVenuePagingRequest({ index: 1, limit: 20 }))
      result.status == "success"
        ? yield put(
            appActions.appReceiveAlert({
              message: "Succeed updating a mangaed venue!"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with updating a managed venue!"
            })
          );
    } else {
      yield put(
        actions.searchSkyboxVenueFailure({
          venue,
          isCalledFromCreateVenue: false
        })
      );
    }
    // else if (data.length === 1) {
    //   yield put(actions.OpenSkyboxVenueDupModal(data))
    //   const { payload: selectedVenue } = yield take(
    //     actions.SELECT_MODAL_SKYBOX_VENUE
    //   )
    //   yield put(
    //     appActions.appReceiveAlert({
    //       message: "Succeed To Search From Skybox!"
    //     })
    //   )
    //   const {
    //     data: { ok }
    //   } = yield call(
    //     api.updateManagedVenue,
    //     formatUpdateVenueForSearchSkybox(data[0]),
    //     venue.tMasterVenueId
    //   )

    //   // yield put(actions.fetchManagedVenuePagingRequest({ index: 1, limit: 20 }))

    //   ok
    //     ? yield put(
    //         appActions.appReceiveAlert({
    //           message: "Succeed updating a mangaed venue!"
    //         })
    //       )
    //     : yield put(
    //         appActions.appReceiveAlert({
    //           message: "Something went wrong with updating a managed venue!"
    //         })
    //       )
    // }
    // else {
    //   yield put(actions.searchSkyboxVenueFailure(venue))
    // }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
  }
}

const formatAddedVenue = venues => {
  return venues.map(venue => {
    const {
      id,
      name,
      url,
      postalCode,
      timezone,
      city,
      country,
      state,
      address
    } = venue;

    return {
      tMasterVenueId:
        url != undefined || url != null ? url.split("/venue/")[1] : "",
      name: name,
      tmScrapingId:
        url != undefined || url != null ? url.split("/venue/")[1] : "",
      tmOfficialId: id,
      tmName: name,
      url,
      timezone,
      city: city ? city.name : "",
      country: country ? country.name : "",
      countryCode: country ? country.countryCode : "",
      state: state ? state.name : "",
      stateCode: state ? state.stateCode : "",
      zip: postalCode,
      address: address ? address.line1 : "",
      venueId: url !== undefined || url != null ? url.split("/venue/")[1] : "",
      stockType: "MOBILE_TRANSFER"
    };
  });
};

function* searchVenueSaga(action) {
  const { keyword } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(api.searchManagedVenue, keyword);
    yield put(actions.searchVenueSuccess(formatAddedVenue(data)));
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error));
    } else if (error.response.status === 401) {
      yield put(actions.searchVenueSuccess([]));
      error.message = error.response.data.message;
      yield put(appActions.appReceiveError(error));
    } else {
      yield put(appActions.appReceiveError(error));
    }
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* searchVenueInSkyBoxSaga(action) {
  const venue = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data } = yield call(
      api.searchSkyboxVenue,
      formatSearchVenueData(venue)
    );
    if (data.length > 1) {
      yield put(appActions.appStopFetching());
      yield put(actions.OpenSkyboxVenueDupModal(data));
      const { payload: selectedVenue } = yield take(
        actions.SELECT_MODAL_SKYBOX_VENUE
      );
      venue["skyboxVenueId"] = selectedVenue.id;
      yield put(actions.createManagedVenueRequest(venue));
    } else if (data.length === 1) {
      yield put(appActions.appStopFetching());
      yield put(actions.OpenSkyboxVenueDupModal(data));
      const { payload: selectedVenue } = yield take(
        actions.SELECT_MODAL_SKYBOX_VENUE
      );
      venue["skyboxVenueId"] = selectedVenue.id;
      yield put(actions.createManagedVenueRequest(venue));
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed To Search From Skybox!"
        })
      );
    } else {
      yield put(
        actions.searchSkyboxVenueFailure({
          venue,
          isCalledFromCreateVenue: true
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

function* updateVenueIsBlackListSaga(action) {
  const { venueId, is_blacklist } = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const { data: hasSucceed } = yield call(
      api.updateVenueIsBlackListed,
      venueId,
      is_blacklist
    );
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Venue Successfully Updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of managed venue! "
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

function* fetchDuplicateVenueSearchSaga(action) {
  const venueRequest = action.payload;
  try {
    yield put(appActions.duplicateVenuesStartFetching());

    const { data: managedVenues } = yield call(
      api.fetchDuplicateVenueSearch,
      venueRequest
    );

    if (managedVenues.success) {
      yield put(
        actions.fetchDuplicateVeuneSearchSuccess({
          totalVenues: managedVenues.data.totalVenues,
          venueList: managedVenues.data.venueList,
          page: action.payload.index
        })
      );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with updation of managed venue! "
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.duplicateVenuesStopFetching());
  }
}

function* deleteDuplicateVenueSaga(action) {
  const { deleteIds, page } = action.payload;
  try {
    const {
      data: { status }
    } = yield call(api.deleteManagedVenue, { deleteIds });

    if (status === "success") {
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed deleting a duplicate venue!"
        })
      );

      yield put(appActions.duplicateVenuesStartFetching());

      const { data: managedVenues } = yield call(
        api.fetchDuplicateVenueSearch,
        {
          page,
          limit: 20,
          typeKey: "TM"
        }
      );

      if (managedVenues.success) {
        yield put(
          actions.fetchDuplicateVeuneSearchSuccess({
            totalVenues: managedVenues.data.totalVenues,
            venueList: managedVenues.data.venueList,
            page
          })
        );
      } else {
        yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a managed venue!"
          })
        );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with deleting a managed venue!"
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.duplicateVenuesStopFetching());
  }
}

function* updateDuplicateVenueIsBlackListSaga(action) {
  const { venueId, is_blacklist } = action.payload;
  try {
    const { data: hasSucceed } = yield call(
      api.updateVenueIsBlackListed,
      venueId,
      is_blacklist
    );
    if (hasSucceed) {
      yield put(
        appActions.appReceiveAlert({
          message: "Venue Successfully Updated!"
        })
      );

      yield put(appActions.duplicateVenuesStartFetching());

      const { data: managedVenues } = yield call(
        api.fetchDuplicateVenueSearch,
        {
          page: 1,
          limit: 20,
          typeKey: "TM"
        }
      );

      if (managedVenues.success) {
        yield put(
          actions.fetchDuplicateVeuneSearchSuccess({
            totalVenues: managedVenues.data.totalVenues,
            venueList: managedVenues.data.venueList,
            page: 1
          })
        );
      } else {
        yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a managed venue!"
          })
        );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with updation of managed venue! "
        })
      );
    }
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

function* updateDuplicateVenueBySkyboxVenueSaga(action) {
  const { data, page } = action.payload;
  try {
    yield put(appActions.duplicateVenuesStartFetching());

    const {
      data: { success }
    } = yield call(api.updateVenueBySkyboxVenueId, data);

    if (success === true) {
      yield put(
        appActions.appReceiveAlert({
          message: "Venue updated successfully."
        })
      );

      const { data: managedVenues } = yield call(
        api.fetchDuplicateVenueSearch,
        {
          page,
          limit: 20,
          typeKey: "TM"
        }
      );

      if (managedVenues.success) {
        yield put(
          actions.fetchDuplicateVeuneSearchSuccess({
            totalVenues: managedVenues.data.totalVenues,
            venueList: managedVenues.data.venueList,
            page
          })
        );
      } else {
        yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a managed venue!"
          })
        );
      }
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with deleting a managed venue!"
        })
      );
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  } finally {
    yield put(appActions.duplicateVenuesStopFetching());
  }
}

function* bulkUpdatePriceLETSaga(action) {
  const pageFilter = action.payload.filter;
  delete action.payload.filter;
  try {
    const {
      data: { status }
    } = yield call(api.bulkUpdatePriceLET, action.payload);

    if (status === "success") {
      // yield put(actions.bulkUpdatePriceLETSuccess(action.payload))
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed updating LET pricing!"
        })
      );
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something went wrong with updating LET pricing!"
        })
      );
    }
    yield put(actions.fetchManagedVenueSearchRequest(pageFilter));
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error));
    else yield put(appActions.appReceiveError(error));
  }
}

function* watchVenuesSaga() {
  yield takeEvery(actions.createManagedVenueRequest, createManagedVenueSaga);

  yield takeEvery(actions.fetchManagedVenueRequest, fetchManagedVenueSaga);

  yield takeEvery(
    actions.fetchManagedVenuePagingRequest,
    fetchManagedVenuePagingSaga
  );

  yield takeEvery(
    actions.fetchManagedVenueSearchRequest,
    fetchManagedVenueSearchSaga
  );

  yield takeEvery(actions.deleteManagedVenueRequest, deleteManagedVenueSaga);

  yield takeEvery(actions.updateManagedVenueRequest, updateManagedVenueSaga);

  yield takeEvery(actions.searchSkyboxVenueRequest, searchSkyboxVenueSaga);

  yield takeEvery(
    actions.updatePriceMarkUpPctForVenueRequest,
    updatePriceMarkUpPctForVenueSaga
  );

  yield takeEvery(actions.searchVenueRequest, searchVenueSaga);

  yield takeEvery(actions.searchVenueInSkyBoxRequest, searchVenueInSkyBoxSaga);

  yield takeEvery(
    actions.updateVenueIsBlackListRequest,
    updateVenueIsBlackListSaga
  );

  yield takeEvery(
    actions.fetchDuplicateVenueSearchRequest,
    fetchDuplicateVenueSearchSaga
  );

  yield takeEvery(
    actions.updateDuplicateVenueIsBlackListRequest,
    updateDuplicateVenueIsBlackListSaga
  );
  yield takeEvery(
    actions.deleteDuplicateVenueRequest,
    deleteDuplicateVenueSaga
  );
  yield takeEvery(
    actions.updateVenueBySkyboxVenueIdRequest,
    updateDuplicateVenueBySkyboxVenueSaga
  );
  yield takeEvery(actions.bulkUpdatePriceLETRequest, bulkUpdatePriceLETSaga);
}

export default watchVenuesSaga;

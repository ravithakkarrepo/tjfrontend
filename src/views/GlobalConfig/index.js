import { connect } from "react-redux";

import {
  fetchGlobalConfigRequest,
  deleteGlobalConfigRequest,
  addGlobalConfigRequest,
  updateGlobalConfigRequest,
  fetchGlobal_tab_ConfigRequest
} from "../../actions/globalConfig";
import {
  getGlobalConfigs,
  getGlobaltabConfigs,
  getIsFetching
} from "../../reducers";
import GlobalConfig from "./GlobalConfig";
import { appReceiveAlert } from "../../actions/app";

const GlobalConfigContainer = connect(
  state => ({
    globals: getGlobalConfigs(state),
    global_tab: getGlobaltabConfigs(state),
    isFetching: getIsFetching(state)
  }),
  {
    fetchGlobalConfigRequest,
    deleteGlobalConfigRequest,
    addGlobalConfigRequest,
    updateGlobalConfigRequest,
    fetchGlobal_tab_ConfigRequest,
    appReceiveAlert
  }
)(GlobalConfig);

export default GlobalConfigContainer;

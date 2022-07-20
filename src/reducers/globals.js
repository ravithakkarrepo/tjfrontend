import {
  FETCH_GLOBAL_SUCCESS,
  FETCH_GLOBAL_TAB_SUCCESS,
  FETCH_GLOBAL_SESSION_CONFIG_SUCCESS
} from "../actions/globalConfig";

const globals = (
  state = {
    globals: [],
    globals_tab: [],
    globalsSessionConfig: {}
  },
  action
) => {
  switch (action.type) {
    case FETCH_GLOBAL_SUCCESS:
      return {
        ...state,
        globals: action.payload
      };
    case FETCH_GLOBAL_TAB_SUCCESS:
      return {
        ...state,
        globals_tab: action.payload
      };
    case FETCH_GLOBAL_SESSION_CONFIG_SUCCESS:
      return {
        ...state,
        globalsSessionConfig: {
          sessionLogoutTimeInMinutes: action.payload.sessionLogoutTimeInMinutes,
          sessionExpiryCheckTimeInMinutes:
            action.payload.sessionExpiryCheckTimeInMinutes
        }
      };
    default:
      return state;
  }
};

export default globals;
export const getGlobalConfigs = state => state.globals;
export const getGlobaltabConfigs = state => state.globals_tab;
export const getGlobalsSessionConfig = state => state.globalsSessionConfig;

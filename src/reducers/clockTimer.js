import * as actions from "../actions/clockTime";

const initalState = {
  clockTimeList: []
};

const clockTimer = (state = initalState, action) => {
  switch (action.type) {
    case actions.FETCH_CLOCKTIMER_SUCCESS:
      return { ...state, clockTimeList: action.payload };
    case actions.CLOCK_IN_CLOCK_OUT_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.userInfo
      };
    default:
      return state;
  }
};

export default clockTimer;

export const getClockTimer = state => state.clockTimeList;

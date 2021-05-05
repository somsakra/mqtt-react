import { APP_SET_INSTALL_STATUS } from "../Constants";

const initialState = {
  wood1: {
    opacity: 0.5,
  },
  wood2: {
    opacity: 0.25,
  },
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_SET_INSTALL_STATUS:
      return { ...state, wood1: { opacity: 1 }, wood2: { opacity: 0.5 } };

    default:
      return state;
  }
};

export default appReducer;

import {
  CHANGE_THEME,
} from "./types";

export default {
  [CHANGE_THEME](state, info) {
    state.theme = info;
  },
};

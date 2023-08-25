import {createStore} from "vuex"

import mutations from "./mutations"
import actions from "./action"
import getters from "./getters";
const state = {
  theme:"defaultTheme"
}
 const store = createStore({
   state,
   mutations,
   actions,
   getters,
 })
export default store;
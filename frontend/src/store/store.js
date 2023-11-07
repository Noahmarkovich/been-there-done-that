import { createStore, combineReducers } from "redux";

import { profileReducer } from "./profile.reducer.js";

const rootReducer = combineReducers({
  profileModule: profileReducer,
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;
export const store = createStore(rootReducer, middleware);

store.subscribe(() => {
  console.log("**** Store state changed: ****");
  console.log("storeState:\n", store.getState());
  console.log("*******************************");
});

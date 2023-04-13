import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer, State } from "./reducers";

export const store = createStore<State, any, any, any>(
  reducer,applyMiddleware(thunk)
);
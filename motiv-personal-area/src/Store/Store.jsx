import {combineReducers, createStore, applyMiddleware} from "redux";
import AuthReducer from "./Reducers/AuthReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import DataReducer from "./Reducers/DataReducer";

const rootReducer = combineReducers({
    AuthReducer,
    DataReducer,
});

export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
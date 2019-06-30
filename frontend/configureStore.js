import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware"
import reducers from "./src/reducers";
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore = preloadedState =>
  createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(promise(), thunk)));

export default configureStore;

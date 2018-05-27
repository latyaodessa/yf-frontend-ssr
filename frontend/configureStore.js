import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import reducer from "./ducks";
import { createLogger } from 'redux-logger'
import promise from "redux-promise-middleware"
import reducers from "./src/reducers";

const logger = createLogger({
//
});
const configureStore = preloadedState =>
  createStore(reducers, preloadedState, applyMiddleware(promise(), thunk));

export default configureStore;

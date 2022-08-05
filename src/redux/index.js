import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer } from './loginReducer';

const reducers = combineReducers({ loginReducer });
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export { store };

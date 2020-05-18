import {combineReducers} from 'redux';
import * as Auth from './auth';
import * as Account from './account';
import * as Stock from './stock';
import * as Waste from './waste';

export default combineReducers(
  Object.assign(Auth, Account, Stock, Waste),
);

import * as Auth from './auth';
import * as Account from './account';
import * as Stock from './stock';
import * as Waste from './waste';
import * as Error from './error';
const ActionCreators = Object.assign({}, Auth, Account, Stock, Waste, Error);

export default ActionCreators;


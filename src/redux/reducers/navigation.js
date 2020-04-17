import AppRouteConfigs from '../../navigators/AppRouteConfigs';

const firstAction = AppRouteConfigs.router.getActionForPathAndParams('Login');
const initialNavState = AppRouteConfigs.router.getStateForAction(firstAction);

const nav = (state = initialNavState, action) => {
  const nextState = AppRouteConfigs.router.getStateForAction(action, state);
  return nextState || state;
};

export {nav};
import { theme } from '../../global';
import { Action } from '../../models/redux/Action';
import { THEME_SWITCH } from '../actions/types';

const INITIAL_STATE = {
  theme: theme
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case THEME_SWITCH:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

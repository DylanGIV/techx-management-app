import { THEME_SWITCH } from './types';

export const themeSwitch = (theme: any) => {
  return (dispatch: any) => {
    dispatch({
      type: THEME_SWITCH,
      payload: theme
    });
  };
};

import {appStateUser, UserState} from './user.state';
import { ActionTypes, All } from './user.actions';

export function userReducer(state: UserState = appStateUser.user, action: All): UserState {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        current: action.user
      };
    case ActionTypes.RESET_CURRENT_USER:
      return {
        ...state,
        current: {
          id: null,
          token: ''
        }
      };
    default: return state;
  }
}

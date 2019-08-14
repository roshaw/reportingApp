import { Action } from '@ngrx/store';
import {UserModel} from '../user.model';

export enum ActionTypes {
  UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER',
  RESET_CURRENT_USER = 'RESET_CURRENT_USER',
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout'
}

export class Login implements Action {
  readonly type: ActionTypes.LOGIN = ActionTypes.LOGIN;
  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type: ActionTypes.LOGOUT = ActionTypes.LOGOUT;
}

export class ResetCurrentUser implements Action {
  public readonly type: ActionTypes.RESET_CURRENT_USER = ActionTypes.RESET_CURRENT_USER;
}

export class UpdateCurrentUser implements Action {
  public readonly type: ActionTypes.UPDATE_CURRENT_USER = ActionTypes.UPDATE_CURRENT_USER;
  constructor( public user: UserModel) {}
}

export type All = UpdateCurrentUser
  | ResetCurrentUser
  | Login
  | Logout;

import {UserModel} from '../user.model';

export interface UserState {
  current: UserModel;
}

export interface AppUserState {
  user: UserState;
}

export const appStateUser: AppUserState = {
  user: {
    current: {
      id: null,
      token: ''
    },
  }
};

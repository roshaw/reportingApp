/**
 * all reducers
 * type ActionReducerMap<AppStateModel>
 */
import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {userReducer} from '../user/store/user.reducer';
import {reportReducer} from '../report/store/report.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  report: reportReducer
};

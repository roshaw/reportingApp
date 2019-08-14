import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {appStateUser, UserState} from '../user/store/user.state';
import {appStateReport, ReportState} from '../report/store/report.state';

export interface AppState {
  user: UserState;
  report: ReportState;
}

export const appState: AppState = {
  ...appStateUser,
  ...appStateReport
};
/**
 * getting synchronously state
 * by passing store as argument
 * @param store this.store (Store<AppState>)
 */
export const getState = (store: Store<AppState>): AppState => {
  let _state: AppState;
  store.pipe(select((state: AppState) => state)).pipe(take(1)).subscribe(o => _state = o);
  return _state;
};

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {UserService} from '../user.service';
import {ActionTypes, Login, ResetCurrentUser, UpdateCurrentUser} from './user.actions';
import {Observable} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {UserModel} from '../user.model';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(ActionTypes.LOGIN),
      mergeMap((action: Login) => {
        return this.userService.login(action.payload.username, action.payload.password)
          .pipe(
            mergeMap((user: UserModel) => {
              return [
                (new UpdateCurrentUser(user))
              ];
            }),
            catchError((error) => {
              return [];
            })
          );
      })
    );

  @Effect()
  Logout: Observable<any> = this.actions
    .pipe(
      ofType(ActionTypes.LOGOUT),
      mergeMap(()  => {
        return [(new ResetCurrentUser())];
      })
    );
}

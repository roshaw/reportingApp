import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {AppState} from './app.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import {reducers} from './reducers';
import {UserEffects} from '../user/store/user.effects';
import {UserService} from '../user/user.service';
import {ReportEffects} from '../report/store/report.effects';
import {ReportService} from '../report/report.service';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({keys: ['user'], rehydrate: true})(reducer);
}

const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      UserEffects,
      ReportEffects
    ])
  ],
  exports: [
    StoreModule
  ],
  providers: [
    UserService,
    ReportService
  ]
})
export class AppStoreModule { }

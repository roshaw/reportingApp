import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) { }

  // Auth services
  login(username: string, password: string) {
    return this.http.post('someApiURL/users/authenticate', {
      userName: username,
      password: password
    });
  }
}


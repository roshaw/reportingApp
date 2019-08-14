import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Login} from '../store/user.actions';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.store.pipe(select(state => state.user.current.token)).subscribe(token => {
        if (token) {
          this.router.navigate(['/app/report/list']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    this.store.dispatch(new Login({userName: 'userName', password: 'password'}));
  }
}

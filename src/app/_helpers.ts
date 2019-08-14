import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {Validators} from '@angular/forms';
import {NoLRWhitespaceValidator} from './shared/validators/whitespace.validator';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/report/list') && method === 'GET':
          return getReports();
        case url.endsWith('/report/single/123') && method === 'GET':
          return getSingleReport();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      return ok({
        id: 12,
        username: 'userName',
        firstName: 'First',
        lastName: 'Last',
        token: 'fake-jwt-token'
      });
    }

    function getReports() {
      const list = [
        {
          id: 123,
          basicInfo: {
            childName: 'Jhon Dow',
            dateOfBirth: new Date('2011-03-21'),
            allegation: 'Hit the moon'
          }
        },
        {
          id: 124,
          basicInfo: {
            childName: 'Mario Johns',
            dateOfBirth: new Date('2010-01-04'),
            allegation: 'Hit a metal object'
          }
        }
      ];
      return ok(list);
    }

    function getSingleReport() {
      const report = {
          id: 123,
          basicInfo: {
            childName: 'Jhon Dow',
            dateOfBirth: new Date('2011-03-21'),
            gender: 'm',
            disability: true,
            atsi: false
          },
          allegation: {
            perpetratorName: 'Pencho Nashenski',
            perpetratorStatus: 'Employee',
            deptNumberOfOffice: 'SOme offise name'
          }

        };
      return ok(report);
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

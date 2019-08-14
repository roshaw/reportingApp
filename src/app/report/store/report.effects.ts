import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Observable} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ReportService} from '../report.service';
import {ActionTypes, GetReports, GetSingleReport, PopulateCurrentReport, PopulateReportsList} from './report.actions';
import {ReportModel} from '../report.model';

@Injectable()
export class ReportEffects {

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private reportService: ReportService
  ) {}

  @Effect()
  GetReports: Observable<any> = this.actions
    .pipe(
      ofType(ActionTypes.GET_REPORTS),
      mergeMap((action: GetReports) => {
        return this.reportService.getReports()
          .pipe(
            mergeMap((reports: ReportModel[]) => {
              return [
                (new PopulateReportsList(reports))
              ];
            }),
            catchError((error) => {
              return [];
            })
          );
      })
    );

  @Effect()
  GetSingleReport: Observable<any> = this.actions
    .pipe(
      ofType(ActionTypes.GET_SINGLE_REPORT),
      mergeMap((action: GetSingleReport) => {
        return this.reportService.getSingleReport(action.id)
          .pipe(
            mergeMap((report: ReportModel) => {
              return [
                (new PopulateCurrentReport(report))
              ];
            }),
            catchError((error) => {
              return [];
            })
          );
      })
    );
}

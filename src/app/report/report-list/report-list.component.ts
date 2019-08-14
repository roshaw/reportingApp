import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, getState} from '../../store/app.state';
import {GetReports, PopulateReportsList} from '../store/report.actions';
import {Subscription} from 'rxjs';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';
import {orderBy, process, SortDescriptor, State} from '@progress/kendo-data-query';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnDestroy {

  public gridData: GridDataResult;

  private preserveData: GridDataResult;

  public state: State = {
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public sortConfig = {
    allowUnsort: true,
    mode: true
  };
  public sort: SortDescriptor[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(new PopulateReportsList());
    this.store.dispatch(new GetReports());

    this.subscription.add(
      this.store.pipe(select(state => state.report.list)).subscribe(reports => {
        this.populateGridData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  populateGridData() {
    let reports = getState(this.store).report.list;
    if (reports.length > 0) {
      reports = reports.map(model => {
        return {
          ...model,
          dateOfBirthAsDate: new Date(model.basicInfo.dateOfBirth)
        };
      });
    }
    this.gridData = process(orderBy(reports, this.sort), this.state);
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.populateGridData();
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.populateGridData();
  }

  editReport(id: any) {
    this.router.navigate(['../edit', id], {relativeTo: this.route});
  }

  createNewReport() {
    this.router.navigate(['../new'], {relativeTo: this.route});
  }
}

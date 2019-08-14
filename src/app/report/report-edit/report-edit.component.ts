import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState, getState} from '../../store/app.state';
import {NoLRWhitespaceValidator} from '../../shared/validators/whitespace.validator';
import {Observable, Subscription} from 'rxjs';
import {ReportModel} from '../report.model';
import {ActivatedRoute} from '@angular/router';
import {CreateReport, GetSingleReport, PopulateCurrentReport, UpdateReport} from '../store/report.actions';
import {skip, take} from 'rxjs/operators';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit, OnDestroy {

  form: FormGroup;

  report: Observable<ReportModel>;

  subscription: Subscription = new Subscription();

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.report = this.store.pipe(select(state => state.report.current));

    this.store.dispatch(new PopulateCurrentReport());

    this.form = this.fb.group({
      basicInfo: this.fb.group({
        childName: ['', [Validators.required, NoLRWhitespaceValidator]],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        disability: [true],
        atsi: [false]
      }),
      allegation: this.fb.group({
        perpetratorName: ['', [Validators.required, NoLRWhitespaceValidator]],
        perpetratorStatus: ['', Validators.required],
        deptNumberOfOffice: ['', Validators.required]
      })
    });

    if (this.route.snapshot.params.reportId) {
      // Here you should send this.route.snapshot.params.reportId as a parameter
      this.store.dispatch(new GetSingleReport(123));

      // Here I skip the first result from store (skip(1)) - this will be the default data
      // and take only the second one (take(1)) to populated to form, so to trigger form validation
      // The second one will be the data from API after you make API GET request
      this.subscription.add(
        this.store.pipe(select(state => state.report.current)).pipe(skip(1)).pipe(take(1)).subscribe(report => {
          this.form.patchValue(report);
        })
      );
      this.editMode = true;
    } else {
      this.store.dispatch(new PopulateCurrentReport(this.form.value));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveReport() {
    if (this.form.invalid) {
      return;
    }

    const data = getState(this.store).report.current;
    if (this.editMode) {
      this.store.dispatch(new CreateReport(data));
    } else {
      this.store.dispatch(new UpdateReport(data));
    }

  }
}

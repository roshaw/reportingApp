import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState, getState} from '../../../store/app.state';
import {PopulateSectionInCurrentReport} from '../../store/report.actions';

@Component({
  selector: 'app-alegation',
  templateUrl: './alegation.component.html',
  styleUrls: ['./alegation.component.scss']
})
export class AlegationComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;

  perpetratorStatuses = ['Employee', 'Volunteer', 'Other'];

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select(state => state.report.current.allegation)).subscribe(allegation => {
        if (allegation && Object.keys(allegation).length > 0) {
          this.form.patchValue(allegation, {emitEvent: false});
        }
      })
    );

    this.synchronizeForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateField(value, field: string) {
    let allegation = getState(this.store).report.current.allegation;
    allegation = {
      ...allegation,
      [field]: value
    };
    this.store.dispatch(new PopulateSectionInCurrentReport('allegation', allegation));
  }

  private synchronizeForm() {
    this.subscription.add(
      this.form.get('perpetratorName').valueChanges.subscribe(perpetratorName => {
        this.updateField(perpetratorName, 'perpetratorName');
      })
    );
    this.subscription.add(
      this.form.get('perpetratorStatus').valueChanges.subscribe(perpetratorStatus => {
        this.updateField(perpetratorStatus, 'perpetratorStatus');
      })
    );

    this.subscription.add(
      this.form.get('deptNumberOfOffice').valueChanges.subscribe(deptNumberOfOffice => {
        this.updateField(deptNumberOfOffice, 'deptNumberOfOffice');
      })
    );
  }
}

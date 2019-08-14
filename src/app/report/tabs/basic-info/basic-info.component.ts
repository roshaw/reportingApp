import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState, getState} from '../../../store/app.state';
import {Subscription} from 'rxjs';
import {PopulateSectionInCurrentReport} from '../../store/report.actions';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;

  genderList = [
    {
      name: 'Male',
      value: 'm'
    }, {
      name: 'Female',
      value: 'f'
    }
  ];

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select(state => state.report.current.basicInfo)).subscribe(basicInfo => {
        if (basicInfo && Object.keys(basicInfo).length > 0) {
          this.form.patchValue(basicInfo, {emitEvent: false});
        }
      })
    );

    this.synchronizeForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateField(value, field: string) {
    let basicInfo = getState(this.store).report.current.basicInfo;
    basicInfo = {
      ...basicInfo,
      [field]: value
    };
    this.store.dispatch(new PopulateSectionInCurrentReport('basicInfo', basicInfo));
  }

  private synchronizeForm() {
    this.subscription.add(
      this.form.get('childName').valueChanges.subscribe(childName => {
        this.updateField(childName, 'childName');
      })
    );

    this.subscription.add(
      this.form.get('dateOfBirth').valueChanges.subscribe(dateOfBirth => {
        this.updateField(dateOfBirth, 'dateOfBirth');
      })
    );

    this.subscription.add(
      this.form.get('gender').valueChanges.subscribe(gender => {
        this.updateField(gender, 'gender');
      })
    );

    this.subscription.add(
      this.form.get('disability').valueChanges.subscribe(disability => {
        this.updateField(disability, 'disability');
      })
    );

    this.subscription.add(
      this.form.get('atsi').valueChanges.subscribe(atsi => {
        this.updateField(atsi, 'atsi');
      })
    );
  }
}

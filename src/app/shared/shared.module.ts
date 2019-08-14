import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {GridModule} from '@progress/kendo-angular-grid';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {TabStripModule} from '@progress/kendo-angular-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';

const imports = [
  ReactiveFormsModule,
  InputsModule,
  GridModule,
  ButtonsModule,
  DialogsModule,
  DropDownsModule,
  TabStripModule,
  DateInputsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...imports
  ],
  exports: imports
})
export class AppSharedModule { }

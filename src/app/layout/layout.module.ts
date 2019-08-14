import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout-routing.module';
import {AppSharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    LayoutRoutesModule,
  ],
  exports: [],
  declarations: [
    LayoutComponent
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { FilterPopoverPageModule } from '../filter-popover/filter-popover.module';

@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    FilterPopoverPageModule,
    IonicPageModule.forChild(SchedulePage)
  ],
  entryComponents: [
    SchedulePage
  ]
})
export class SchedulePageModule {}

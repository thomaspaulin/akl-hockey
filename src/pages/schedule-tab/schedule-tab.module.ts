import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleTabPage } from './schedule-tab';

@NgModule({
  declarations: [
    ScheduleTabPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleTabPage),
  ],
})
export class ScheduleTabPageModule {}

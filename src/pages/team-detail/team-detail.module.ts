import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TeamDetailPage} from './team-detail';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    TeamDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TeamDetailPage),
  ],
})
export class TeamDetailPageModule {}

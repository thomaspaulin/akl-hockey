import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TeamsPage} from './teams';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    TeamsPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TeamsPage),
  ],
})
export class TeamsPageModule {}

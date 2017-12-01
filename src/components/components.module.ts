import {NgModule} from '@angular/core';
import {MatchCardComponent} from './match-card/match-card';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from 'ionic-angular';
import {FilterModalComponent} from './filter-modal/filter-modal';

@NgModule({
	declarations: [
    MatchCardComponent,
    FilterModalComponent
  ],
	imports: [
    BrowserModule,
    IonicModule
  ],
	exports: [
    MatchCardComponent,
    FilterModalComponent
  ]
})
export class ComponentsModule {}

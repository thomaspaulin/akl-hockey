import {NgModule} from '@angular/core';
import {MatchCardComponent} from './match-card/match-card';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from 'ionic-angular';
import {FilterModalComponent} from './filter-modal/filter-modal';
import {FilterViewComponent} from './filter-view/filter-view';

@NgModule({
	declarations: [
    MatchCardComponent,
    FilterModalComponent,
    FilterViewComponent
  ],
	imports: [
    BrowserModule,
    IonicModule
  ],
	exports: [
    MatchCardComponent,
    FilterModalComponent,
    FilterViewComponent
  ]
})
export class ComponentsModule {}

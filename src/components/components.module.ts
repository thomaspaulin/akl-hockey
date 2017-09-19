import { NgModule } from '@angular/core';
import { FilterPopoverComponent } from './filter-popover/filter-popover';
import { MatchCardComponent } from './match-card/match-card';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
	  MatchCardComponent,
	  FilterPopoverComponent
  ],
	imports: [
    BrowserModule,
    IonicModule
  ],
	exports: [
	  MatchCardComponent,
	  FilterPopoverComponent
  ]
})
export class ComponentsModule {}

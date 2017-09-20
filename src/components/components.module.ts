import { NgModule } from '@angular/core';
import { MatchCardComponent } from './match-card/match-card';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
	  MatchCardComponent
  ],
	imports: [
    BrowserModule,
    IonicModule
  ],
	exports: [
	  MatchCardComponent
  ]
})
export class ComponentsModule {}

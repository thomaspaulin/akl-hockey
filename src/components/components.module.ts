import { NgModule } from '@angular/core';
import { FilterPopoverComponent } from './filter-popover/filter-popover';
import { MatchCardComponent } from './match-card/match-card';
@NgModule({
	declarations: [
	  MatchCardComponent,
	  FilterPopoverComponent
  ],
	imports: [],
	exports: [
	  MatchCardComponent,
	  FilterPopoverComponent
  ]
})
export class ComponentsModule {}

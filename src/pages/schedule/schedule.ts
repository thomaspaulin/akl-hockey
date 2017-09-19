import { Component, OnInit } from '@angular/core';
import { Match } from '../../model/Match';
import { MatchService } from '../../app/match.service';
import { NavController, PopoverController } from 'ionic-angular';
import { CleanUp } from '../../app/Cleanup';
import { Filter, filterObject } from '../../model/filter';

@Component({
  selector: 'schedule-page',
  templateUrl: 'schedule.html'
})
export class SchedulePage extends CleanUp implements OnInit {
  matches: Array<Match>;  // todo convert to RxJS
  filters: Filter[] = [];

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              private matchService: MatchService) {
    super();
  }

  ngOnInit(): void {
    this.matchService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(matches => {
        this.matches = matches.filter((match: Match) => filterObject(match, this.filters))
      });
  }

  // openFilterPopover() {
  //   const popover = this.popoverCtrl.create(MatchFilterPopoverComponent);
  //   popover.present();
  // }
}

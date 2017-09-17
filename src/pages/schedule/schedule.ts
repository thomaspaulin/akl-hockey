import { Component, OnInit } from '@angular/core';
import { Match } from '../../model/Match';
import { MatchService } from '../../app/match.service';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CleanUp } from '../../app/Cleanup';

@Component({
  selector: 'schedule-page',
  templateUrl: 'schedule.html'
})
export class SchedulePage extends CleanUp implements OnInit {
  matches: Array<Match>;  // todo convert to RxJS

  constructor(public navCtrl: NavController,
              private matchService: MatchService) {
    super();
  }

  ngOnInit(): void {
    this.matchService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(matches => {
        console.log(`matches: ${JSON.stringify(matches)}`);
        this.matches = matches
      });
  }
}

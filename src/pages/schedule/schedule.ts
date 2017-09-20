import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Team } from '../../model/Team';
import { Match } from '../../model/Match';
import { Filter, filter } from "../../model/filter";
import { CleanUp } from '../../app/Cleanup';
import { TeamsService } from '../../app/teams.service';
import { MatchService } from '../../app/match.service';
import { FilterPopoverPage } from '../filter-popover/filter-popover';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage extends CleanUp {
  matches: Array<Match>;  // todo convert to RxJS
  filteredMatches$: BehaviorSubject<Array<Match>>;
  teams: Array<Team>;
  filters$: BehaviorSubject<Array<Filter>>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private matchService: MatchService,
              private teamsService: TeamsService) {
    super();
    this.filteredMatches$ = new BehaviorSubject([]);
    this.filters$ = new BehaviorSubject([]);
  }

  openFilterPopover() {
    const popover = this.popoverCtrl.create(FilterPopoverPage);
    popover.present();

    popover.onDidDismiss(response => {
      this.filters$.next(response);
    })
  }

  ionViewDidLoad() {
    this.matchService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(matches => {
        this.matches = matches.filter((match: Match) => filter.filterMatch(match, this.filters$.value));
        this.filteredMatches$.next(this.matches);
      });

    this.filters$.subscribe((filters: Array<Filter>) => {
      this.filteredMatches$.next(this.matches.filter((match: Match) => filter.filterMatch(match, filters)));
    });

    this.teamsService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(teams => this.teams = teams);
  }
}

import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from '../../model/Match';
import { filter, Filter } from '../../model/filter';
import { EventTypes } from '../../model/event-types.constants';
import { Team } from '../../model/Team';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// TODO add refresh capability

@IonicPage()
@Component({
  selector:    'page-schedule-tab',
  templateUrl: 'schedule-tab.html',
})
export class ScheduleTabPage {
  week = 'current';
  matches: Array<Match> = [];
  teams: Array<Team> = [];

  teams$: Observable<Array<Team>>;
  matches$: Observable<Array<Match>>;
  filters$: BehaviorSubject<Array<Filter>>;
  filteredMatches$: BehaviorSubject<Array<Match>>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: Events) {
    this.filters$ = new BehaviorSubject([]);
    this.filteredMatches$ = new BehaviorSubject([]);

    if (navParams.data) {
      this.week = navParams.data.week;
      this.matches$ = navParams.data.matches;
      this.teams$ = navParams.data.teams;
      this.filters$ = navParams.data.filters;
    }
  }

  ionViewDidLoad() {
    this.matches$.subscribe(matches => {
      this.matches = matches.filter((match: Match) => filter.filterMatch(match, this.filters$.value));
      this.filteredMatches$.next(this.matches);
    });
    this.teams$.subscribe(teams => this.teams = teams);

    this.filters$.subscribe((filters: Array<Filter>) => {
      this.filteredMatches$.next(this.matches.filter((match: Match) => filter.filterMatch(match, filters)));
    });
  }

  title(week: string): string {
    switch (week) {
      case 'previous':
        return 'Past Schedule';
      case 'upcoming':
        return 'Upcoming Schedule';
      default:
        return `This Week's Schedule`
    }
  }
}

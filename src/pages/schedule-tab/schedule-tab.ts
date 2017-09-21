import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from '../../model/Match';
import { filter, Filter } from '../../model/filter';
import { EventTypes } from '../../model/event-types.constants';
import { Team } from '../../model/Team';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@IonicPage()
@Component({
  selector:    'page-schedule-tab',
  templateUrl: 'schedule-tab.html',
})
export class ScheduleTabPage {
  week = 'current';
  matches: Array<Match> = [];
  teams: Array<Team> = [];

  teams$: BehaviorSubject<Array<Team>>;
  matches$: BehaviorSubject<Array<Match>>;
  filters$: BehaviorSubject<Array<Filter>>;
  filteredMatches$: BehaviorSubject<Array<Match>>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: Events) {
    this.teams$ = new BehaviorSubject([]);
    this.matches$ = new BehaviorSubject([]);
    this.filters$ = new BehaviorSubject([]);
    this.filteredMatches$ = new BehaviorSubject([]);

    if (navParams.data) {
      this.week = navParams.data.week;
    }

    // todo what if the server responses come back before this subscription happens?
    // will it not be populated?
    events.subscribe(EventTypes.MATCHES_UPDATED, (matches) => this.matches$.next(matches));
    events.subscribe(EventTypes.TEAMS_UPDATED, (teams) => this.teams$.next(teams));
    events.subscribe(EventTypes.MATCH_FILTERS, (filters) => this.filters$.next(filters));
  }

  ionViewDidLoad() {
    this.matches$.subscribe(matches => {
      this.matches = matches.filter((match: Match) => filter.filterMatch(match, this.filters$.value));
      this.filteredMatches$.next(this.matches);
    });

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

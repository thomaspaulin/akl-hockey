import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { SCHEDULE_FILTER_KEY } from '../../app/app.constants';
import { CleanUpOnViewWillUnload } from '../../app/CleanupOnViewWillUnload';
import { FilterModalComponent } from "../../components/filter-modal/filter-modal";
import { filter, FilterValue } from "../../model/filter";
import { Match } from '../../model/Match';
import { Team } from '../../model/Team';
import { MatchesProvider } from "../../providers/match/match.provider";
import { TeamsProvider } from "../../providers/team/team.provider";

@IonicPage()
@Component({
  selector:    'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage extends CleanUpOnViewWillUnload {
  matches$: Observable<Match[]>;
  filters$: BehaviorSubject<{[key: string]: FilterValue}>;
  filteredMatches$: BehaviorSubject<Array<Match>>;

  teams: Array<Team>;
  activeTeam: Team;
  start: string = new Date().toDateString();
  end: string = new Date().toDateString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private matchService: MatchesProvider,
              private teamsProvider: TeamsProvider,
              private storage: Storage) {
    super();
    this.filteredMatches$ = new BehaviorSubject([]);
    this.filters$ = new BehaviorSubject({});
    this.storage.get(SCHEDULE_FILTER_KEY).then(filters => this.filters$.next(filters)); //todo possible race condition with the filter dialog
  }

  ionViewWillUnload() {
    this.filteredMatches$.complete();
  }

  presentFilterModal() {
    const data = {
      teams:      this.teams,
      activeTeam: this.activeTeam,
      start:      this.start,
      end:        this.end
    };
    const filterModal = this.modalCtrl.create(FilterModalComponent, data);
    filterModal.present();
    filterModal.onDidDismiss(data => {
      this.storage.set(SCHEDULE_FILTER_KEY, {
        activeTeam: data.activeTeam,
        start:      data.start,
        end:        data.end
      });
      this.filters$.next(data)
    });
  }

  ionViewDidLoad() {
    // todo cache teams. Allow a whole season before invalidating because of how the league works. Shorter if using other leagues
    // todo when start and end change there should be a check to see if the new date range extends past when has been downloaded. If it has a new http query should be made
    //    e.g. if matches downloaded are from Jun to Sep and then start changes to Apr then the games from start - 1 week until Sep should be fetched
    this.teamsProvider.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(teams => this.teams = teams);

    this.matches$ = this.matchService.fetchBetween(
      moment(new Date(this.start)).startOf('week').subtract(7, 'days').toDate(),
      moment(new Date(this.end)).endOf('week').add(7, 'days').toDate()
    );

    Observable.combineLatest(this.filters$, this.matches$)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(([filters, matches]) => {
        if (filters) {
          this.activeTeam = filters.activeTeam as Team;
          this.start = filters.start as string;
          this.end = filters.end as string;
        }

        this.filteredMatches$.next(matches.filter((match: Match) => filter.filterMatch(match, filters)));

        let shouldUpdateEarlierMatches = true;
        let shouldUpdateLaterMatches = true;
        matches.map(match => {
          // if we find no matches outside the filters then do a fetch
          shouldUpdateEarlierMatches = shouldUpdateEarlierMatches && new Date(this.start).getTime() < match.date.getTime();
          shouldUpdateLaterMatches = shouldUpdateLaterMatches && new Date(this.end).getTime() > match.date.getTime();
        });

        if (shouldUpdateEarlierMatches || shouldUpdateLaterMatches) {
          // todo mutex this so it won't get thrashed and thrash the server
          this.doRefresh({});
        }
      });
  }

  onCardTapped(m: any) {
    // Don't allow tapping for 1.0.0 while the cards are meaningless
    // this.navCtrl.push(MatchDetailPage, {
    //   match: m
    // });
  }

  doRefresh(refresher: any) {
    // set up the subscription before making the request so when it comes
    // back and updates matches$ the subscription will fire
    this.matches$.subscribe(() => {
        if (refresher && !!refresher.complete) {
          // when using the refresh button this function doesn't exist so don't try to call it
          refresher.complete();
        }
      });
    this.matches$ = this.matchService.fetchBetween(
      moment(new Date(this.start)).startOf('week').subtract(7, 'days').toDate(),
      moment(new Date(this.end)).endOf('week').add(7, 'days').toDate()
    );
  }
}

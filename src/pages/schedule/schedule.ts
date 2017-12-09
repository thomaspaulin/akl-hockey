import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";
import {SCHEDULE_FILTER_KEY} from '../../app/app.constants';
import {CleanUpOnViewWillUnload} from '../../app/CleanupOnViewWillUnload';
import {FilterModalComponent} from "../../components/filter-modal/filter-modal";
import {filter, Filters} from "../../model/filter";
import {Match} from '../../model/Match';
import {Team} from '../../model/Team';
import {MatchesProvider} from "../../providers/match/match.provider";
import {TeamsProvider} from "../../providers/team/team.provider";

@IonicPage()
@Component({
  selector:    'page-schedule',
  templateUrl: 'schedule.html'
})


// TODO: Make this page the container component and make a presentational component for the schedule view
// TODO: Add a no matches found placeholder
// TODO: cache teams. Allow a whole season before invalidating because of how the league works. Shorter if using other leagues




export class SchedulePage extends CleanUpOnViewWillUnload {
  matches$: Observable<Match[]>;
  filters$: BehaviorSubject<Filters>;
  filteredMatches$: BehaviorSubject<Array<Match>>;
  loading$: BehaviorSubject<boolean>;

  teams: Array<Team> = [];
  activeTeam: Team = null;
  start: Date = moment(new Date()).startOf('week').subtract(7, 'days').toDate();
  end: Date = moment(new Date()).endOf('day').add(7, 'days').toDate();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private matchService: MatchesProvider,
              private teamsProvider: TeamsProvider,
              private storage: Storage) {
    super();
    this.filteredMatches$ = new BehaviorSubject([]);
    this.filters$ = new BehaviorSubject({
      activeTeam: null,
      start:      this.start,
      end:        this.end
    });
    this.loading$ = new BehaviorSubject(false);
    this.storage.get(SCHEDULE_FILTER_KEY).then(filters => {
      this.filters$.next(filters)
    }); //todo possible race condition with the filter dialog
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
      if (data) {
        this.storage.set(SCHEDULE_FILTER_KEY, {
          activeTeam: data.activeTeam,
          start: data.start,
          end: data.end
        });
        this.filters$.next(data)
      }
    });
  }

  ionViewDidLoad() {
    this.teamsProvider.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(teams => this.teams = teams);

    this.matches$ = this.matchService.fetchBetween(this.start, this.end);
    this.matches$.subscribe(ms => this.loading$.next(ms.length <= 0));

    Observable.combineLatest(this.filters$, this.matches$)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(([filters, matches]) => {
        if (filters) {
          this.activeTeam = filters.activeTeam;
          this.start = filters.start;
          this.end = filters.end;
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
    this.matches$ = this.matchService.fetchBetween(this.start, this.end);
  }
}

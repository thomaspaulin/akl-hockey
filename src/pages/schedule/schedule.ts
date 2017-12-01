import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";
import {SCHEDULE_FILTER_KEY} from '../../app/app.constants';
import {CleanUpOnViewWillUnload} from '../../app/CleanupOnViewWillUnload';
import {Filter, filter} from "../../model/filter";
import {Match} from '../../model/Match';
import {Team} from '../../model/Team';
import {MatchesProvider} from "../../providers/match/match.provider";
import {TeamsProvider} from "../../providers/team/team.provider";
import {MatchDetailPage} from '../match-detail/match-detail';
import {FilterModalComponent} from "../../components/filter-modal/filter-modal";

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector:    'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage extends CleanUpOnViewWillUnload {
  matches$: Observable<Match[]>;
  filters$: BehaviorSubject<Array<Filter>>;
  filteredMatches$: BehaviorSubject<Array<Match>>;

  teams: Array<Team>;
  activeTeam: Team;
  start: Date = moment.utc().toDate();
  end: Date = moment.utc().toDate();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private matchService: MatchesProvider,
              private teamsProvider: TeamsProvider,
              private storage: Storage) {
    super();
    this.filteredMatches$ = new BehaviorSubject([]);
    this.filters$ = new BehaviorSubject([]);
    this.storage.get(SCHEDULE_FILTER_KEY).then(filters => this.filters$.next(filters)); //todo possible race condition with the filter dialog
  }

  ionViewWillUnload() {
    this.filteredMatches$.complete();
  }

  presentFilterModal() {
    const filterModal = this.modalCtrl.create(FilterModalComponent, {
      teams: this.teams,
      activeTeam: this.activeTeam,
      start: this.start,
      end: this.end
    });
    filterModal.present();
    filterModal.onDidDismiss(data => {
      this.activeTeam = data.activeTeam;
      this.start = data.start;
      this.end = data.end;
    });
  }

  ionViewDidLoad() {
    // todo change this.start and this.end to be those stored in the app state
    this.matches$ = this.matchService.fetchBetween(
      moment(this.start).utc().startOf('week').subtract(7, 'days').toDate(),
      moment(this.end).utc().endOf('week').add(7, 'days').toDate()
    );

    Observable.combineLatest(this.filters$, this.matches$)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(([filters, matches]) => {
        this.filteredMatches$.next(matches.filter((match: Match) => filter.filterMatch(match, filters)));
      });

    this.teamsProvider.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(teams => this.teams = teams);
  }

  onCardTapped(m: any) {
    this.navCtrl.push(MatchDetailPage, {
      match: m
    });
  }

  doRefresh(refresher: any) {
    // set up the subscription before making the request so when it comes
    // back and updates matches$ the subscription will fire
    this.matches$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if(refresher && !!refresher.complete)  {
          // when using the refresh button this function doesn't exist so don't try to call it
          refresher.complete();
        }
      });
    this.matches$ = this.matchService.fetchBetween(
      moment(this.start).utc().startOf('week').subtract(7, 'days').toDate(),
      moment(this.end).utc().endOf('week').add(7, 'days').toDate()
    );
  }
}

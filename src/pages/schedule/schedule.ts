import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Team } from '../../model/Team';
import { Match } from '../../model/Match';
import { Filter, filter } from "../../model/filter";
import { CleanUp } from '../../app/Cleanup';
import { TeamsService } from '../../app/teams.service';
import { MatchService } from '../../app/match.service';
import { FilterPopoverPage } from '../filter-popover/filter-popover';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TeamDetailPage } from '../team-detail/team-detail';
import { MatchDetailPage } from '../match-detail/match-detail';
import { ScheduleTabPage } from '../schedule-tab/schedule-tab';
import { Observable } from 'rxjs/Observable';
import { EventTypes } from '../../model/event-types.constants';

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
export class SchedulePage {
  teams: Array<Team> = [];
  matches: Array<Match> = [];

  teams$: Observable<Array<Team>>;
  matches$: Observable<Array<Match>>;
  filters$: BehaviorSubject<Array<Filter>>;
  filteredMatches$: BehaviorSubject<Array<Match>>;

  // Can't type these as pages because they don't have the instance fields provided at compile time
  // they get generated through the nav
  previousTab;
  currentTab;
  upcomingTab;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private matchService: MatchService,
              private teamsService: TeamsService) {
    // start loading the matches and teams when the schedule page loads instead of doing it on each tab
    this.matches$ = this.matchService.fetchAll();
    this.teams$ = this.teamsService.fetchAll();

    this.filters$ = new BehaviorSubject([]);
    this.filteredMatches$ = new BehaviorSubject([]);

    this.previousTab = ScheduleTabPage;
    this.currentTab = ScheduleTabPage;
    this.upcomingTab = ScheduleTabPage;
  }

  openFilterPopover() {
    const popover = this.popoverCtrl.create(FilterPopoverPage);
    popover.present();

    popover.onDidDismiss(response => {
      this.filters$.next(response);
    })
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

  onCardTapped(m: any) {
    this.navCtrl.push(MatchDetailPage, {
      match: m
    });
  }
}

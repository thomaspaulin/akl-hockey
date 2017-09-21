import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SchedulePage } from '../pages/schedule/schedule';
import { TeamsPage } from '../pages/teams/teams';
import { TeamsService } from './teams.service';
import { MatchService } from './match.service';
import { EventTypes } from '../model/event-types.constants';
import { Team } from '../model/Team';
import { Match } from '../model/Match';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SchedulePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private teamsService: TeamsService,
              private matchService: MatchService,
              private events: Events) {
    this.initializeApp();

    this.pages = [
      {title: 'Schedule', component: SchedulePage},
      {title: 'Teams', component: TeamsPage}
    ];

    this.teamsService.fetchAll()
      .subscribe((teams: Array<Team>) => {
        this.events.publish(EventTypes.TEAMS_UPDATED, teams);
      });

    this.matchService.fetchAll()
      .subscribe((matches: Array<Match>) => {
        this.events.publish(EventTypes.MATCHES_UPDATED, matches);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

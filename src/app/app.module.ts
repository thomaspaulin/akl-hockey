import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { SuperTabsController, SuperTabsModule } from 'ionic2-super-tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SchedulePage } from '../pages/schedule/schedule';
import { MatchService } from './match.service';
import { TeamsService } from './teams.service';
import { ComponentsModule } from '../components/components.module';
import { TeamsPage } from '../pages/teams/teams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { FilterPopoverPageModule } from '../pages/filter-popover/filter-popover.module';
import { MatchDetailPage } from '../pages/match-detail/match-detail';
import { ScheduleTabPage } from '../pages/schedule-tab/schedule-tab';

@NgModule({
  declarations: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    MatchDetailPage,
    SchedulePage,
    ScheduleTabPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    FilterPopoverPageModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    MatchDetailPage,
    SchedulePage,
    ScheduleTabPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatchService,
    TeamsService,
    SuperTabsController
  ]
})
export class AppModule {}

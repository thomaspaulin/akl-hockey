import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SchedulePage} from '../pages/schedule/schedule';
import {MatchService} from './match.service';
import {ComponentsModule} from '../components/components.module';
import {TeamsPage} from '../pages/teams/teams';
import {TeamDetailPage} from '../pages/team-detail/team-detail';
import {FilterPopoverPageModule} from '../pages/filter-popover/filter-popover.module';
import {MatchDetailPage} from '../pages/match-detail/match-detail';
import {HttpClientModule} from "@angular/common/http";
import {RinksProvider} from '../providers/rink/rink';
import {DivisionsProvider} from '../providers/division/division';
import {TeamsProvider} from '../providers/team/team';

@NgModule({
  declarations: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    MatchDetailPage,
    SchedulePage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    FilterPopoverPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    MatchDetailPage,
    SchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatchService,
    RinksProvider,
    DivisionsProvider,
    TeamsProvider
  ]
})
export class AppModule {}

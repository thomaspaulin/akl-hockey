import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TeamListPage } from '../pages/team-list/team-list';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { SchedulePage } from '../pages/schedule/schedule';
import { MatchService } from './match.service';
import { TeamsService } from './teams.service';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    TeamListPage,
    TeamDetailPage,
    SchedulePage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamListPage,
    TeamDetailPage,
    SchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatchService,
    TeamsService
  ]
})
export class AppModule {}

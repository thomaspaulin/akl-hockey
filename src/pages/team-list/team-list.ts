import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Team } from '../../model/Team';
import { db } from '../../model/dummy-data';
import { TeamDetailPage } from '../team-detail/team-detail';

@Component({
  selector: 'team-list-page',
  templateUrl: 'team-list.html'
})
export class TeamListPage {
  teams: Array<Team>;

  constructor(public navCtrl: NavController) {
    this.teams = db.teams;
  }

  itemTapped(event, team) {
    this.navCtrl.push(TeamDetailPage, {
      team: team
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from '../../model/Team';
import { db } from '../../model/dummy-data';
import { TeamDetailPage } from '../team-detail/team-detail';

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams: Array<Team>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teams = db.teams;
  }

  ionViewDidLoad() {
  }

  itemTapped(event, team) {
    this.navCtrl.push(TeamDetailPage, {
      team: team
    });
  }

}

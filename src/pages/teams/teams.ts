import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Team} from '../../model/Team';
import {TeamDetailPage} from '../team-detail/team-detail';
import {TeamsProvider} from "../../providers/team/team";
import {CleanUpOnViewWillUnload} from "../../app/CleanupOnVIewWillUnload";

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
export class TeamsPage extends CleanUpOnViewWillUnload {
  teams: Array<Team>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private teamsProvider: TeamsProvider) {
    super();
  }

  ionViewDidLoad() {
    this.teamsProvider.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((teams: Team[]) => this.teams = teams);
  }

  itemTapped(event, team) {
    this.navCtrl.push(TeamDetailPage, {
      team: team
    });
  }

}

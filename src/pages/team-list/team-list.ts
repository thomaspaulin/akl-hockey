import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from '../../model/Team';
import { db } from '../../model/dummy-data';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.html'
})
export class TeamListPage {
  selectedTeam: Team;
  teams: Array<Team>;

  // "Ionic 2’s navigation module caches views in the DOM the same way Ionic 1 does, so the view is generally only
  // loaded once"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTeam = navParams.get('team');

    this.teams = db.teams;
  }

  itemTapped(event, team) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TeamListPage, {
      team: team
    });
  }
}

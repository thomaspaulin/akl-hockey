import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from '../../model/Team';

@Component({
  selector: 'team-detail-page',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  team: Team;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.get('team');
  }
}

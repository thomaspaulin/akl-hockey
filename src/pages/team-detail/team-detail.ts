import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from '../../model/Team';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  team: Team;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.get('team');
  }

  ionViewDidLoad() {
  }

}

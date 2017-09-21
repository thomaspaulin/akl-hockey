import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from '../../model/Match';

@IonicPage()
@Component({
  selector: 'page-match-detail',
  templateUrl: 'match-detail.html',
})
export class MatchDetailPage {
  match: Match;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.match = navParams.get('match');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchDetailPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CleanUpOnViewWillUnload } from "../../app/CleanupOnViewWillUnload";
import { Division } from '../../model/Division';
import { DivisionsProvider } from '../../providers/division/division.provider';
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
export class TeamsPage extends CleanUpOnViewWillUnload {
  divisions$: Observable<Division[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private divisionProvider: DivisionsProvider) {
    super();
  }

  ionViewDidLoad() {
    this.divisions$ = this.divisionProvider.fetchAll();
  }

  itemTapped(event, team) {
    this.navCtrl.push(TeamDetailPage, {
      team: team
    });
  }

}

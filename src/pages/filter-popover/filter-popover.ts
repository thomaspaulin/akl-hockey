import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../model/Team';
import { TeamsService } from '../../app/teams.service';

@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {
  team: Team;
  teams$: Observable<Array<Team>>;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private teamsService: TeamsService) {
  }

  ionViewDidLoad() {
    this.teams$ = this.teamsService.fetchAll()
  }

  close() {
    console.log(this.team);
    this.viewCtrl.dismiss({team: this.team});
  }
}

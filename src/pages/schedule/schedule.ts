import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Team } from '../../model/Team';
import { Match } from '../../model/Match';
import { Filter, filterObject } from "../../model/filter";
import { CleanUp } from '../../app/Cleanup';
import { TeamsService } from '../../app/teams.service';
import { MatchService } from '../../app/match.service';
import { FilterPopoverPage } from '../filter-popover/filter-popover';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage extends CleanUp {
  matches: Array<Match>;  // todo convert to RxJS
  teams: Array<Team>;
  filters: Filter[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private matchService: MatchService,
              private teamsService: TeamsService) {
    super();
  }

  openFilterPopover() {
    const popover = this.popoverCtrl.create(FilterPopoverPage);
    popover.present();
  }

  ionViewDidLoad() {
    this.matchService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(matches => {
        this.matches = matches.filter((match: Match) => filterObject(match, this.filters))
      });

    this.teamsService.fetchAll()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(teams => this.teams = teams);
  }
}

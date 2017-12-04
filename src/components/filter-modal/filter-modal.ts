import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import * as moment from 'moment';
import { Team } from "../../model/Team";

/**
 * Generated class for the FilterModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-modal',
  templateUrl: 'filter-modal.html'
})
export class FilterModalComponent {

  readonly defaultStart = moment(new Date()).startOf('week').subtract(7, 'days').toDate();
  readonly defaultEnd = moment(new Date()).endOf('week').add(7, 'days').toDate();

  teams: Team[] = [];
  activeTeam: Team = null;
  // Ionic doesn't give these back as Date objects... And it's causing all kinds of bugs if I transform everywhere
  // so I'm keeping as strings until the last possible moment
  start: Date = this.defaultStart;

  end: Date = this.defaultEnd;

  constructor(public viewCtrl: ViewController,
              params: NavParams) {
    if (params.data) {
      this.teams = params.data.teams;
      this.activeTeam = params.data.activeTeam;
      this.start = params.data.start;
      this.end = params.data.end;
    }
  }

  // Used by the select to determine if a team is the selected one
  compareTeams(t1: Team, t2: Team): boolean {
    return t1 && t2 && (t1.ID === t2.ID) || (t1.name === t2.name && t1.divisionName === t2.divisionName);
  }

  onSave(filters: any) {
    this.viewCtrl.dismiss(filters);
  }

  onCancel() {
    this.viewCtrl.dismiss({
      activeTeam: this.activeTeam,
      start:      this.start,
      end:        this.end
    });
  }
}

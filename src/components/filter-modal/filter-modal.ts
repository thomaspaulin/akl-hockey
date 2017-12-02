import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {Team} from "../../model/Team";

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

  teams: Team[];
  activeTeam: Team;
  // Ionic doesn't give these back as Date objects... And it's causing all kinds of bugs if I transform everywhere
  // so I'm keeping as strings until the last possible moment
  start: string;
  end: string;

  constructor(public viewCtrl: ViewController,
              params: NavParams) {
    this.teams = params.data.teams;
    this.activeTeam = params.data.activeTeam;
    this.start = params.data.start;
    this.end = params.data.end;
  }

  // Used by the select to determine if a team is the selected one
  compareTeams(t1: Team, t2: Team): boolean {
    return t1 && t2 && (t1.ID === t2.ID) || (t1.name === t2.name && t1.divisionName === t2.divisionName);
  }

  update() {
    const data = {
      activeTeam: this.activeTeam,
      start: this.start,
      end: this.end
    };

    this.viewCtrl.dismiss(data);
  }

  cancel() {
    this.viewCtrl.dismiss({
      activeTeam: 'Show all',
      start: `${new Date().getUTCFullYear()}-01-01`,
      end: `${new Date().getUTCFullYear()}-12-31`
    });
  }
}

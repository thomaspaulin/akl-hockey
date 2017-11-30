import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Team} from '../../model/Team';
import {Filter} from '../../model/filter';
import {TeamsProvider} from "../../providers/team/team.provider";

// todo convert to a component not a page. Make sure it's also an entrycomponent in app.module.ts when that's done
// because I think that was the main reason it didn't work last try
// https://learnionic2.com/2017/03/05/ionic-2-getting-data-from-a-popover-to-your-component-using-ondismiss/
@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {
  //todo find a way to type ngModel better or use ngSubmit not ngModel
  teamName: string;  // not sure why ngModel is making it an array
  teams$: Observable<Array<Team>>;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private teams: TeamsProvider) {
  }

  ionViewDidLoad() {
    this.teams$ = this.teams.fetchAll()
  }

  close() {
    const filters: Array<Filter> = [];
    if (this.teamName && this.teamName !== 'Show all') {
      filters.push(<Filter>{key: 'away', value: this.teamName});
      filters.push(<Filter>{key: 'home', value: this.teamName});
    }

    this.viewCtrl.dismiss(filters);
  }
}

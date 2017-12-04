import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from "../../model/Team";
import { formatDate } from '../../providers/match/match.provider';

/**
 * Generated class for the FilterViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-view',
  templateUrl: 'filter-view.html'
})
export class FilterViewComponent implements OnInit {
  @Input() teams: Team[] = [];
  @Input() activeTeam: Team = null;
  @Input() teamCompareFn: Function;
  @Input() start: Date;
  @Input() end: Date;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  selectOpts = {title: 'Team'};
  startStr: string;
  endStr: string;

  constructor() {
  }

  ngOnInit(): void {
    this.startStr = this.start ? formatDate(this.start) : '';
    this.endStr = this.end ? formatDate(this.end) : '';
  }

  onSave() {
    const data = {
      activeTeam: this.activeTeam,
      start:      new Date(Date.parse(this.startStr)),
      end:        new Date(Date.parse(this.endStr))
    };
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
}

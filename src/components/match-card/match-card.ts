import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../model/Team';
import {Match} from '../../model/Match';
import {UNKNOWN_TEAM} from "../../app/app.constants";

@Component({
  selector:        'match-card',
  templateUrl:     'match-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCardComponent implements OnInit {
  @Input() match;
  @Input() teams: Array<Team>;
  @Output() cardTapped = new EventEmitter<Match>();

  away: Team;
  home: Team;

  constructor() {
  }

  ngOnInit(): void {
    this.away = UNKNOWN_TEAM;
    this.home = UNKNOWN_TEAM;
    if (this.teams) {
      let retrievedAway = this.teams.find(team => this.away.name.toLowerCase() === team.name.toLowerCase());
      let retrievedHome = this.teams.find(team => this.home.name.toLowerCase() === team.name.toLowerCase());
      if (retrievedAway) {
        this.away = retrievedAway;
      }
      if (retrievedHome) {
        this.home = retrievedHome;
      }
    }
  }

  onCardTapped(m: Match) {
    this.cardTapped.emit(m);
  }
}

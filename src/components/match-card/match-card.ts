import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../model/Team';
import {Match} from '../../model/Match';
import {Division} from "../../model/Division";
import {DEFAULT_AVATAR_URL} from "../../app/app.constants";

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
    let unknown = <Team>{name: 'Unknown', division: <Division>{name: 'Unknown'}, logoURL: DEFAULT_AVATAR_URL};
    this.away = unknown;
    this.home = unknown;
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

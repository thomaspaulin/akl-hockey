import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Team } from '../../model/Team';

@Component({
  selector:        'match-card',
  templateUrl:     'src/components/match-card/match-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCardComponent implements OnInit {
  @Input() match;
  @Input() teams: Array<Team>;

  away: Team;
  home: Team;

  constructor() {
  }

  ngOnInit(): void {
    this.away = this.teams.find(team => this.match.away.toLowerCase() === team.name.toLowerCase());
    this.home = this.teams.find(team => this.match.home.toLowerCase() === team.name.toLowerCase());
  }
}

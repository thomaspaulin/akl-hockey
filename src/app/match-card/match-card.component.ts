import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Team } from '../../model/Team';
import { TeamsService } from '../teams.service';
import { CleanUp } from '../Cleanup';

@Component({
  selector: 'match-card',
  templateUrl: 'match-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCardComponent extends CleanUp implements OnInit {
  @Input() match;

  away: Team;
  home: Team;

  constructor(private teamsService: TeamsService) {
    super();
  }

  ngOnInit(): void {
    this.teamsService.fetch(this.match.away)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(t => this.away = t);

    this.teamsService.fetch(this.match.home)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(t => this.home = t);
  }
}

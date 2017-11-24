import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../model/Team';
import {Match} from '../../model/Match';

@Component({
  selector:        'match-card',
  templateUrl:     'match-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCardComponent implements OnInit {
  @Input() match;
  @Input() teams: Array<Team>;
  @Output() cardTapped = new EventEmitter<Match>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCardTapped(m: Match) {
    this.cardTapped.emit(m);
  }
}

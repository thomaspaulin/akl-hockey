import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'match-card',
  templateUrl: 'match-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCardComponent {
  @Input() match;

  constructor() {
  }
}

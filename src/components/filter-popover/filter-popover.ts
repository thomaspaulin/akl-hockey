import { Component } from '@angular/core';

/**
 * Generated class for the FilterPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-popover',
  templateUrl: 'filter-popover.html'
})
export class FilterPopoverComponent {

  text: string;

  constructor() {
    console.log('Hello FilterPopoverComponent Component');
    this.text = 'Hello World';
  }

}

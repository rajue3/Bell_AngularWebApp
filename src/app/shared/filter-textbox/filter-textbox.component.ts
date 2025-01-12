import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-textbox',
  template: `
    <form>
         <input type="text" name="filter"
                [(ngModel)]="model.filter" style="width:300px;"
                (keyup)="filterChanged($event)"  />
    </form>
  `
})
export class FilterTextboxComponent {


    model: { filter: string } = { filter: '' };

    @Output()
    changed: EventEmitter<string> = new EventEmitter<string>();

    filterChanged(event: any) {
      event.preventDefault();
      this.changed.emit(this.model.filter); //Raise changed event
    }
}

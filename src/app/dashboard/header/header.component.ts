import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleEvent = new EventEmitter<void>();
  constructor() {}
  toggleFilter(e: Event) {
    e.preventDefault();
    this.toggleEvent.emit();
  }
}

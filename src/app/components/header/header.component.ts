import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  @Output() inputLogout: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.sidenav.emit();
  }

  logout() {
    this.inputLogout.emit();
  }
}

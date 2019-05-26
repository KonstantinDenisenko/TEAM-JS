import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();
  
  currentValue: string;

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.searchEvent.emit(this.currentValue);
  }
}

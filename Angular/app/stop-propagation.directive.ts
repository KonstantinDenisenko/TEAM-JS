import { Directive, HostListener, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[stopPropagation]'
})
export class StopPropagationDirective {

  @Output() someEvent = new EventEmitter();
  @Input('stopPropagation') someProp;

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ["$event"]) onclick(event) {
    this.someEvent.emit();
    event.stopPropagation();
  }
}

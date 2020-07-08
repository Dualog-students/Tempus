import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appLimitDecimalPlaces]',
})
export class LimitDecimalPlacesDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,1}$/g);
  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow everything except keys used in numbers to pass through
    if (
      !Number(event.key) ||
      String(event.key) === '.' ||
      String(event.key) === ','
    ) {
      return;
    }
    // Current is value of number input field
    const current: string = this.el.nativeElement.children[0].children[1].value;
    if (!String(current).match(this.regex)) {
      // Ignore keyboard event
      event.preventDefault();
    }
  }
}

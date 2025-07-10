import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective {
  @Output() isVisible = new EventEmitter<boolean>();
  private hasBeenVisible = false;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  checkIfVisible() {
    if (this.hasBeenVisible) return;

    const element = this.el.nativeElement;
    const elementPosition = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if element is in viewport
    const isVisible = (
      elementPosition.top <= windowHeight * 0.8 && // 80% of viewport height
      elementPosition.bottom >= 0
    );

    if (isVisible) {
      this.hasBeenVisible = true;
      this.isVisible.emit(true);
    }
  }

  ngOnInit() {
    // Initial check in case the element is already in view
    setTimeout(() => this.checkIfVisible(), 100);
  }
}

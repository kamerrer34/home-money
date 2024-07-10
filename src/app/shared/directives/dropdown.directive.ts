import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  constructor() { }

  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}

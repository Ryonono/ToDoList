import { Directive, ElementRef } from'@angular/core';

@Directive({
  selector: '[setColor]'
})

// 

export class setColorDirective {

  pri: any = document.getElementById('priority-list');

  constructor(el: ElementRef) {
    if (this.pri.value == "high") {
      this.pri.style.color = 'red';
    }else if (this.pri.value == "middle") {
      this.pri.style.color = 'yellow';
    } else if (this.pri.value == "low") {
      this.pri.style.color = 'blue';
    }
    // el.nativeElement.style.color = 
  }

}
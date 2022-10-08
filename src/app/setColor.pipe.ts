import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { List } from './list';
import { ListService } from './list.service';

@Pipe({
  name: 'setColor'
})

// 

export class setColorPipe implements PipeTransform {

  lists: List[] = [];
  pri: any = document.getElementsByClassName('priority-list');

  // constructor(private el: ElementRef, private listService: ListService) { }


  len = this.lists.length;

  // getLists(): void {
  //   // subscribeの中身は、(引数・返り値の型が両方省略された引数 => 関数式　という超省略形になっている)
  //   this.listService.getLists().subscribe(lists => this.lists = lists);
  // }


  transform(value: string) {
    // this.getLists();
    // let num = 0;
    // while (num <= (this.len - 1)) {
    // console.log(this.lists);
    if (value == "high") {
      this.pri[0].style.backgroundColor = 'red';
    } else if (value == "middle") {
      this.pri[0].style.backgroundColor = 'yellow';
    } else if (value == "low") {
      this.pri[0].style.backGroundColor = 'blue';
    }
    // el.nativeElement.style.color = 
    //   num += 1
    // }

  }


}
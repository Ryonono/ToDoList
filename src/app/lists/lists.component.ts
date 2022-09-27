import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list'

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  
  lists: List[]= [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    // subscribeの中身は、(引数・返り値の型が両方省略された引数 => 関数式　という超省略形になっている)
    this.listService.getLists().subscribe(lists => this.lists = lists);
  }


}

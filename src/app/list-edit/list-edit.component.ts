import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  @Input() list?: List;

  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    let num = Number(this.route.snapshot.paramMap.get('id'));
    this.listService.getList(num).subscribe(list => this.list = list);
  }

}

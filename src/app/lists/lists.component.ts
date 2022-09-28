import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[] = [];

  categories: Category[] = [];

  public priorities = ["high", "middle", "low"];


  constructor(private listService: ListService, private builder: FormBuilder, private categoryService: CategoryService) { }


  listForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    explanation: new FormControl('', [Validators.required, Validators.minLength(5)]),
    category_id: new FormControl('', [Validators.required]),
    expiration_day: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getLists();
    // Formにcategoriesを載せるためには、ngOnInitで初期化時にcategoriesも同時にとってくる必要がある
    this.getCategories();
  }

  getLists(): void {
    // subscribeの中身は、(引数・返り値の型が両方省略された引数 => 関数式　という超省略形になっている)
    this.listService.getLists().subscribe(lists => this.lists = lists);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  // public value: number = this.listForm.category_id;

  addList(name: string, category_id: any, explanation: string, expiration_day: any, priority: string): void {
    // name = name.trim();
    // category_id = category_id.trim();
    // explanation = explanation.trim();
    // expiration_day = expiration_day.trim();
    // priority = priority.trim();
    // 一つでもエラーがあれば何も返さない（おそらくこれはValidatorによってうまく制御できていると思うが、一応つけておく)
    if (!name || !category_id || !explanation || !expiration_day || !priority) { return; }
    // listServiceではaddListの引数はList型のlist一つのみだが、今回追加したいのはその中身のそれぞれのカラムなので、以下のように複数のカラムをas ListでList型として見做している
    this.listService.addList({ name, category_id, explanation, expiration_day, priority } as List).subscribe(list => this.lists.push(list));
  }


}

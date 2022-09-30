import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  @Input() list?: List;

  categories: Category[] = [];

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      console.log('notOnlyWhiteSpace Error');
      return { 'notOnlyWhiteSpace': true };
    }
    return null;
  }

  listForm = this.builder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), ListEditComponent.notOnlyWhiteSpace]),
    explanation: new FormControl('', [Validators.required, Validators.minLength(5), ListEditComponent.notOnlyWhiteSpace]),
    category_id: new FormControl('', [Validators.required]),
    expiration_day: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required])
  });

  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router, private builder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getList();
    this.getCategories();
  }

  getList(): void {
    let num = Number(this.route.snapshot.paramMap.get('id'));
    this.listService.getList(num).subscribe(list => this.list = list);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  updateList(name: string, category_id: any, explanation: string, expiration_day: any, priority: string): void {

    let i = this.listForm.controls['category_id'].value;
    if (category_id == `${i}`) {
      category_id = i;
      // なぜかこの条件分岐で3: 5などの値だった場合でも後者のvalueを受け取ってくれる
    }else {
      category_id = i;
    }
    if (!name || !category_id || !explanation || !expiration_day || !priority) { return; }
    // このsubscribeの挙動がわからない
    if (this.list) {
      this.listService.updateList(this.list).subscribe(() => this.goToLists());
    }
  }




  goToLists(): void {
    this.router.navigate(['/lists']);
  }

  // addList(name: string, category_id: any, explanation: string, expiration_day: any, priority: string): void {
  //   // なぜかstring型の　key, valueの状態でcategory_idが出力されるので、そのまま条件分岐した
  //   // →他の条件分岐に全く生かされない作りであり、実際には絶対避けなければいけない（そのために、ngValueの仕組みを学ばないといけない）
  //   if (category_id == "1: 1") {
  //     category_id = 1;
  //   }else if (category_id == "2: 2") {
  //     category_id = 2;
  //   }else if (category_id == "3: 3") {
  //     category_id = 3;
  //   }else {
  //     return;
  //   }

  //   // 一つでもエラーがあれば何も返さない（おそらくこれはValidatorによってうまく制御できていると思うが、一応つけておく)
  //   if (!name || !category_id || !explanation || !expiration_day || !priority) { console.log("There is something wrong with this form."); }
  //   // listServiceではaddListの引数はList型のlist一つのみだが、今回追加したいのはその中身のそれぞれのカラムなので、以下のように複数のカラムをas ListでList型として見做している
  //   this.listService.addList({ name, category_id, explanation, expiration_day, priority } as List).subscribe(list => this.lists.push(list));
  // }

}

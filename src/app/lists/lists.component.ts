import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[] = [];

  categories: Category[] = [];


  // public priorities = ["high", "middle", "low"];

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      console.log('notOnlyWhiteSpace Error');
      return { 'notOnlyWhiteSpace': true };
      // } else if (control.value.trim().length <= Validators.minLength(2)) {
      //   console.log('minLength Error');
      //   return {'minLength': true};
    }
    return null;
  }

  constructor(private listService: ListService, private builder: FormBuilder, private categoryService: CategoryService) { }


  listForm = this.builder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), ListsComponent.notOnlyWhiteSpace]),
    explanation: new FormControl('', [Validators.required, Validators.minLength(5), ListsComponent.notOnlyWhiteSpace]),
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


  // category_idとexpiration_dayがstring型だと解釈されて、引数の値だと言われているnumber, Date型と一致しないというエラーが出ていた
  // →現状any型で引数を受け取ることでエラーはなくなったが、まずanyは使用を避けた方が良い型である＋ 1: 1のように、カテゴリーなどがうまく機能していない
  //expiration_dayはなぜか12時台のみPM12という表記になっているが、特にエラーなく保存・表示できている

  // 一度全てデータをdeleteしてしまったら、idがうまく読み取られないせいで新しく投稿ができなくなってしまう
  addList(name: string, category_id: any, explanation: string, expiration_day: any, priority: string): void {
    name = name.trim();
    category_id = category_id.trim();
    explanation = explanation.trim();
    expiration_day = expiration_day.trim();
    priority = priority.trim();
    // expiration_day = expiration_day.toISOString();
    // なぜかstring型の　key, valueの状態でcategory_idが出力されるので、そのまま条件分岐した
    // if (category_id == "1: 1") {
    //   category_id = 1;
    // } else if (category_id == "2: 2") {
    //   category_id = 2;
    // } else if (category_id == "3: 3") {
    //   category_id = 3;
    // } else {
    //   return;
    // }

    // category_idの特定の要素のみ入手するため、まず上記のように条件分岐を行っていたが、それだとcategoryが追加されたときに
    // 追加された文を使用できなかった。次にtrim（）やsubstr()を使用して得たデータを整形しようとしたが、データが必ず1: 1という連想配列の形で渡されてきており、変更不可能だった。
    // その後１日悩んで放ってしまっていたが、そもそもformの値を持ってきて、その形のうちのiの部分だけを代入しちゃえば新たな変数として作成できるのではないかということで、調べて実装した
    // let reg = new RegExp(this.listForm.controls['category_id'].value);
    let i = this.listForm.controls['category_id'].value;
    if (category_id == `${i}`) {
      category_id = i;
      // なぜかこの条件分岐で3: 5などの値だった場合でも後者のvalueを受け取ってくれる
    }else {
      category_id = i;
    }

    console.log(name);
    console.log(category_id);
    console.log(explanation);
    console.log(expiration_day);
    console.log(priority);
    // 一つでもエラーがあれば何も返さない（おそらくこれはValidatorによってうまく制御できていると思うが、一応つけておく)
    if (!name || !category_id || !explanation || !expiration_day || !priority) { console.log("There is something wrong with this form."); }
    // listServiceではaddListの引数はList型のlist一つのみだが、今回追加したいのはその中身のそれぞれのカラムなので、以下のように複数のカラムをas ListでList型として見做している
    this.listService.addList({ name, category_id, explanation, expiration_day, priority } as List).subscribe(list => this.lists.push(list));
  }


  // update,deleteの記述方法がいまいち理解できていないので、詳しく調べる
  deleteList(list: List): void {
    this.listService.deleteList(list.id).subscribe();
    // これがあることで、deleteメソッドが実行された後に、自動的にページが更新される
    this.ngOnInit();
  }

  // 　Angularの本のp.167に記述してある通り、基本的にlistForm = this.builder.groupのなかでnew FormControlと記述した場合には、htmlでinputタグの中に[formControl]="listForm.controls.category_id"と記述し、
  // それ以降も*ngIf="listForm.controls.category_id.invalidという冗長的な記述が必要であった
  // →下記のようなgetメソッドを使用することで、formControlName="name"とし、それ以降はname.invalidのように楽な記述が可能となる
  get name() { return this.listForm.get('name')!; }
  get category_id() { return this.listForm.get('category_id')!; }


}

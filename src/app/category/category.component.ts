import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  category?: Category;

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      console.log('notOnlyWhiteSpace Error');
      return { 'notOnlyWhiteSpace': true };
    }
    return null;
  }

  constructor(private categoryService: CategoryService, private builder: FormBuilder, private router: Router) { }


  categoryForm = this.builder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), CategoryComponent.notOnlyWhiteSpace])
  });

  categoryEditForm = this.builder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), CategoryComponent.notOnlyWhiteSpace])
  });

  ngOnInit(): void {
    // これをしていなかったことで、ページが読み込まれると同時に一覧が読み込めていなかった
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  // 一度全てデータをdeleteしてしまったら、idがうまく読み取られないせいで新しく投稿ができなくなってしまう
  addCategory(name: string): void {
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category).subscribe(category => this.categories.push(category));
  }

  // updateCategory(name: string): void {
  //   if (this.category) {
  //     this.categoryService.updateCategory(this.category).subscribe(() => this.goToLists());
  //   }
  //   this.ngOnInit();
  // }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.id).subscribe();
    this.ngOnInit();
  }

  goToLists(): void {
    this.router.navigate(['/lists']);
  }


  get name() { return this.categoryForm.get('name')!; }

}

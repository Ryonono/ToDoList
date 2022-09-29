import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      console.log('notOnlyWhiteSpace Error');
      return { 'notOnlyWhiteSpace': true };
    }
    return null;
  }

  constructor(private categoryService: CategoryService, private builder: FormBuilder) { }

  
  categoryForm = this.builder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(2), CategoryComponent.notOnlyWhiteSpace])
  });

  ngOnInit(): void {
    // これをしていなかったことで、ページが読み込まれると同時に一覧が読み込めていなかった
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  addCategory(name: string): void {
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category).subscribe(category => this.categories.push(category));
  }


  get name() { return this.categoryForm.get('name')!; }

}

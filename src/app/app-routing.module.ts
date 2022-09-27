import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'categories', component: CategoryComponent },
  // router-outletを有効化させるにはこの記述が必要
  { path: '', redirectTo: 'lists', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

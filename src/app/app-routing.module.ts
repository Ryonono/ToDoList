import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'categories', component: CategoryComponent },
  // routingを記述するときの:idの書き方はrailsと同じなのでこれは忘れないように！
  { path: "lists/:id/edit", component: ListEditComponent },
  // router-outletを有効化させるにはこの記述が必要
  { path: '', redirectTo: 'lists', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

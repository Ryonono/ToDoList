import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { CategoryComponent } from './category/category.component';
import { ListEditComponent } from './list-edit/list-edit.component';

// ページを開いた際にERROR Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[ListService -> HttpClient -> HttpClient -> HttpClient]: 
// NullInjectorError: No provider for HttpClient!
// NullInjectorError: R3InjectorError(AppModule)[ListService -> HttpClient -> HttpClient -> HttpClient]: というエラーが検証画面で出ていたら、HttpClientModuleがapp.module.tsファイルにないことが原因
// serviceでHttpClientを使用する際には、ここでHttpClientModuleをimportする必要がある
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    CategoryComponent,
    ListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

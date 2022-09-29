import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = '/api/categories';


  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(category => console.log("fetched categories")),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions)
      .pipe(
        tap(category => console.log("added new Category")),
        catchError(this.handleError<Category>("added Category"))
      );
  }

  // Observableのジェネリクス？をCategoryにすると、The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?
  //   Type 'Object' is missing the following properties from type 'Category': id, name　というエラーが出る→any型にする
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl, category, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated Category id = ${category.id}`)),
        catchError(this.handleError<Category>("updated Category"))
      );
  }

  deleteCategory(id: number): Observable<Category> {
    const categoryUrl = `${this.categoriesUrl}/${id}`;
    return this.http.delete<Category>(categoryUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted category id = ${id}`)),
        catchError(this.handleError<Category>("deleted category"))
      );
  }





  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}



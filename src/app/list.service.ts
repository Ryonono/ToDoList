import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { List } from './list';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listsUrl = '/api/lists';
  private categoriesUrl = '/api/categories';

  constructor(private http: HttpClient, route: ActivatedRoute) { }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl)
      .pipe(
        tap(list => console.log("fetched lists")),
        catchError(this.handleError<List[]>('getLists', []))
      );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

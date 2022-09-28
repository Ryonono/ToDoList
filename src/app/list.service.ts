import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        // handleErrorの定義の部分を見たらわかるように、第一引数にgetLists、第二引数に空の配列を渡している
        catchError(this.handleError<List[]>('getLists', []))
      );
  }

  getList(id: number): Observable<List> {
    const listUrl = `/api/lists/${id}`
    // listUrlはこのメソッド内部で定義しているから、this.listUrlという引数は渡さなくても良い
    return this.http.get<List>(listUrl)
      .pipe(
        tap(list => console.log(`fetched Book id = ${id}`)),
        catchError(this.handleError<List>(`getList id = ${id}`))
      )
  }

  addList(list: List): Observable<List> {
    // postメソッドの第一引数はURL,第二引数が加えるデータ、第三引数（オプション）にはヘッダ情報を渡す
    return this.http.post<List>(this.listsUrl, list, this.httpOptions)
    .pipe(
      tap((list:List) => console.log("added new list")),
      catchError(this.handleError<List>("added List"))
    )
  }




  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // TypeScriptの参考書で見たように、handleErrorは第一引数にoperation、第二引数に型引数リストを持つオプショナルなresultを取るので、なくても良い
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

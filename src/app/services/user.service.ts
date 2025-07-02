import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)


  getUsers(): Observable<any> {

    console.log('TEST');

    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      tap( res => {
        console.log(res);

      })
    )
  }

}

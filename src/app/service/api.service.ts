import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri:string = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //get all players from the db
  getPlayers() {
	   return this.http.get(`${this.baseUri}`);
  }

  //add player to db
  addPlayer(player : Player): Observable<any>{
	  return this.http.post(`${this.baseUri}/add`,player).pipe(catchError(this.errorMgmt));
  }

   // Error handling
 errorMgmt(error: HttpErrorResponse) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
   // Get client-side error
   errorMessage = error.error.message;
   } else {
   // Get server-side error
   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   console.log(errorMessage);
 return throwError(errorMessage);

 }
}

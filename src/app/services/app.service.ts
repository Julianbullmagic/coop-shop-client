import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";
import { Store } from "../models/Store";
@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private url = "http://localhost:3000/stores";

  constructor(private http: HttpClient,private errorHandlerService: ErrorHandlerService) {}


  fetchAllStores(): Observable<any> {
      console.log("fetching stores in service!!!!!!!!!!!!")

    return this.http
      .get<any>(this.url,{ responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched stores",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchAllStores", [])
        )
      );
  }



}

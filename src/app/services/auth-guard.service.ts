import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
loggedin
  canActivate(): Observable<boolean> {
    this.loggedin=!!localStorage.getItem('token')
    if (!this.loggedin) {
      this.router.navigate(["login"]);
    }
    return this.loggedin
  }
}

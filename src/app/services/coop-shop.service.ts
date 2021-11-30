import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { catchError, tap, first } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";
import { Store } from "../models/Store";
import { User } from "../models/User";
import { Listing } from "../models/Listing";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "any",
})
export class CoopShopService {
isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
isCool$ = new BehaviorSubject<boolean>(false);
// server="http://localhost:8080/"
// server="/"
server="https://cooperative-marketplace-api.herokuapp.com/"

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private router: Router
  ) {
  }




  fetchAll(): Observable<any[]> {
    console.log("fetching stores in service!!!!!!!!!!!!!")

    return this.http
      .get<any>(this.server+"stores", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched stores",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchAll", [])
        )
      );
  }

  fetchMyStores(): Observable<any[]> {
    console.log("fetching my stores in service!!!!!!!!!!!!!")
    let userid=localStorage.getItem('userid')

    return this.http
      .get<any[]>(this.server+"stores/mystores/"+userid, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched stores",_)),
        catchError(
          this.errorHandlerService.handleError<any[]>("fetchAll", [])
        )
      );
  }



searchStores(search:string): Observable<any[]> {
  console.log("searching stores in service!!!!!!!!!!!!!",`http://localhost:3000/stores/search/${search}`)

  return this.http
    .get<any>(this.server+`stores/search/${search}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("searching for stores",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}

searchStoresByCategory(search:string,category:string): Observable<any[]> {
  console.log("searching stores in service by catergory !!!!!!!!!!!!!",`http://localhost:3000/stores/search/${search}/${category}`)

  return this.http
    .get<any>(this.server+`stores/search/${search}/${category}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("searching for stores by category",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}




searchListings(search:string): Observable<any[]> {
  return this.http
    .get<any>(this.server+`listings/search/${search}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("searching for listings",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}

searchListingsByShop(search:string,storeid:number): Observable<any[]> {
  console.log("searching listings in service!!!!!!!!!!!!!",`http://localhost:3000/listings/searchbyshop/${search}`)
  return this.http
    .get<any>(this.server+`listings/searchbyshop/${storeid}/${search}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("got listings from shop",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}

searchListingsByCategory(search:string,category:string): Observable<any[]> {
  return this.http
    .get<any>(this.server+`listings/search/${search}/${category}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("searching for listings by category",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}



searchListingsByShopCategory(search:string,storeid:number,category:string): Observable<any[]> {
  return this.http
    .get<any>(this.server+`listings/searchbyshop/${storeid}/${search}/${category}`, { responseType: "json" })
    .pipe(
      tap((_) => console.log("got listings from shop by category",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}



  fetchRandomTenStores(): Observable<Store[]> {
    return this.http
      .get<any>(this.server+"stores/getrandomten", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched ten stores",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenstores", [])
        )
      );
  }

  fetchRandomTenListingsFromShop(id:number): Observable<any[]> {
    console.log("getting listings",id)
    return this.http
      .get<Listing[]>(this.server+`listings/randomtenlistingsfromshop/${id}`, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched ten listings from shop",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
        )
      );
  }


    fetchRandomTenListingsFromShopByCategory(id:number,category:string): Observable<any[]> {
      console.log("getting listings from shop by category",id,category)
      return this.http
        .get<Listing[]>(this.server+`listings/randomtenlistingsfromshopbycategory/${id}/${category}`, { responseType: "json" })
        .pipe(
          tap((_) => console.log("fetched ten listings from shop by category",_)),
          catchError(
            this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
          )
        );
    }

    fetchRandomTenListingsByCategory(category:string): Observable<any[]> {
      console.log("getting 10 listings by category",category)
      return this.http
        .get<Listing[]>(this.server+`listings/randomtenlistingsbycategory/${category}`, { responseType: "json" })
        .pipe(
          tap((_) => console.log("fetched ten listings by category",_)),
          catchError(
            this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
          )
        );
    }

    fetchRandomTenStoresByCategory(category:string): Observable<any[]> {
      console.log("getting 10 listings by category",category)
      return this.http
        .get<Listing[]>(this.server+`stores/randomtenstoresbycategory/${category}`, { responseType: "json" })
        .pipe(
          tap((_) => console.log("fetched ten stores by category",_)),
          catchError(
            this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
          )
        );
    }




  fetchListing(id:number): Observable<any[]> {
    console.log("getting listing",id)
    return this.http
      .get<Listing>(this.server+`listings/fetchlisting/${id}`, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched listing",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
        )
      );
  }

  fetchStore(id:number): Observable<Store[]> {
    console.log("getting store",id,`http://localhost:3000/stores/fetchstore/${id}`)
    return this.http
      .get<Listing>(this.server+`stores/fetchstore/${id}`, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched store",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
        )
      );
  }

  fetchStoreCategories(id:number){
    console.log("getting store catergories",id,`http://localhost:3000/listings/getcategoriesforshop/${id}`)
    return this.http
      .get<Listing>(this.server+`listings/getcategoriesforshop/${id}`, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched store categories",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
        )
      );
  }

  fetchAllCategories(){
    console.log("getting all catergories",`http://localhost:3000/listings/getallcategories`)
    return this.http
      .get<Listing>(this.server+`listings/getallcategories`, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched categories",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistingsfromshop", [])
        )
      );
  }



  fetchAllListings(): Observable<any[]> {
    return this.http
      .get<any>(this.server+"listings", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched all listings",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchalllistings", [])
        )
      );
  }

  fetchRandomTenListings(): Observable<any[]> {
    return this.http
      .get<any>(this.server+"listings/tenrandomlistings", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched ten listings",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistings", [])
        )
      );
  }


  searchRandomTenListings(): Observable<any[]> {
    return this.http
      .get<any>(this.server+"listings/tenrandomlistings", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched ten listings",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistings", [])
        )
      );
  }


  searchRandomTenStores(): Observable<any[]> {
    return this.http
      .get<any>(this.server+"listings/tenrandomlistings", { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched ten listings",_)),
        catchError(
          this.errorHandlerService.handleError<any>("fetchtenlistings", [])
        )
      );
  }


fetchListingsForShop(storeid): Observable<any[]> {
  console.log("fetching listings in service!!!!!!!!!!!!!")

  return this.http
    .get<any[]>(this.server+"listings/fetchlistingsforshop/"+storeid, { responseType: "json" })
    .pipe(
      tap((_) => console.log("fetched listings for sshop",_)),
      catchError(
        this.errorHandlerService.handleError<any>("fetchAll", [])
      )
    );
}



  register(user): Observable<any> {
    console.log("USER",user)
    return this.http
      .post<Partial<User>>(this.server+"register", user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
      this.router.navigate(["login"]).then(() => {
window.location.reload();
})
  }

  login(
    email: string,
    password: string
  ): Observable<{
    token: string;
    userId: string;
  }> {
    console.log("email, password",email,password)
    return this.http
      .post(this.server+"login", { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: string,cool:boolean }) => {
          console.log("tokenObject",tokenObject)
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("userid", tokenObject.userId);
          console.log("cool",`${tokenObject.cool}`)
          if(tokenObject.cool){
            localStorage.setItem("cool", `${tokenObject.cool}`);
          }
          this.router.navigate(["home"]).then(() => {
    window.location.reload();
  });
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: string;
          }>("login")
        )
      )
  }


  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("cool");
    localStorage.removeItem("userid");
    this.router.navigate(["home"]).then(() => {
    window.location.reload();
  });
  }


 createStore(store){
    console.log("store in service",store)
    return this.http
      .post(this.server+"stores/create", store, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("store")));
  }

  editStore(store){
    console.log("editing store in service",store)
    return this.http
      .put(this.server+"stores/edit", store, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("store")));
  }

  deleteStore(id: number){
    console.log("deleting store",id)
    let url=this.server+`stores/delete/${id}`
    console.log(url)
    return this.http
      .delete(url, this.httpOptions).pipe(catchError(this.errorHandlerService.handleError<any>("store")))
      .subscribe(data => {
    console.log(data),
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
            localStorage.clear()
          this.router.navigate(['/login'])
        }
      }
    }
  });
url=this.server+`stores/deletelistingsforstore/${id}`
  console.log(url)
  return this.http
    .delete(url, this.httpOptions).pipe(catchError(this.errorHandlerService.handleError<any>("store")))
    .subscribe(data => {console.log(data);});
  }

   createListing(listing){
    console.log("listing in service",listing)
    return this.http
      .post(this.server+"listings/createlisting", listing, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("listing")));
  }

  editListing(listing){
    console.log("editing listing in service",listing)
    return this.http
      .put(this.server+"listings/editlisting", listing, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("listing")));
  }

  deleteListing(id: number){
    console.log("deleteing listing",id)
    let url=this.server+`stores/deletelisting/${id}`
    console.log(url)
    return this.http
      .delete(url, this.httpOptions).pipe(catchError(this.errorHandlerService.handleError<any>("store")))
      .subscribe(data => {
    console.log(data),
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
            localStorage.clear()
          this.router.navigate(['/login'])
        }
      }
    }
  });
  }
}

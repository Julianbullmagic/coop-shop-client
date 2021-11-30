import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { StoreviewerComponent } from './storeviewer/storeviewer.component';
import { ListingviewerComponent } from './listingviewer/listingviewer.component';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule }   from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MystoresComponent } from './mystores/mystores.component';
import { UserstorepageComponent } from './userstorepage/userstorepage.component'
import { SinglelistingComponent } from './singlelisting/singlelisting.component';
import { SinglestoreComponent } from './singlestore/singlestore.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component:  AboutComponent},
  { path: 'home/search/:searchTerm/:storeOrListing', component:HomepageComponent},
  { path: 'home/categorysearch/:category', component: HomepageComponent },
  { path: 'home/categorysearch/:category/:searchTerm/:storeOrListing', component:HomepageComponent},
  { path: 'singlestore/:id/:searchTerm', component:SinglestoreComponent},
  { path: 'singlestore/categorysearch/:id/:category', component:SinglestoreComponent},
  { path: 'singlestore/categorysearch/:id/:category/:searchTerm', component:SinglestoreComponent},
  { path: 'singlelisting/:id', component:  SinglelistingComponent },
  { path: 'singlestore/:id', component:  SinglestoreComponent },
  { path: 'registration', component:RegistrationComponent},
  { path: 'login', component:LoginComponent},
  { path: 'mystores', component:MystoresComponent},
  { path: 'userstorepage/:storeid', component:UserstorepageComponent }
];


@NgModule({
  declarations: [
    AppComponent,AboutComponent,StoreviewerComponent,SinglestoreComponent,SinglelistingComponent,
      ListingviewerComponent, HomepageComponent, SearchComponent,
      SearchresultsComponent,NavbarComponent, RegistrationComponent, LoginComponent,
      MystoresComponent, UserstorepageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
    exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

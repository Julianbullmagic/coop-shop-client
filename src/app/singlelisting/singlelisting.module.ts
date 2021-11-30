import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'


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
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ]
})
export class Module { }

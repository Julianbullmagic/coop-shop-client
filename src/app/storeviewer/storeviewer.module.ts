import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListingviewerComponent } from './listingviewer/listingviewer.component';



@NgModule({
  declarations: [ListingviewerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class Module { }

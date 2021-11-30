import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "src/app/models/Store";
import { Listing } from "src/app/models/Listing";
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-listingviewer',
  templateUrl: './listingviewer.component.html',
  styleUrls: ['./listingviewer.component.scss']
})
export class ListingviewerComponent implements OnInit {
  public listings$: Observable<any[]>;
  public listings=[]
  constructor(private coopShopService: CoopShopService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      console.log("params",params)

    if(params.category){
      console.log("CATEGORY",params.category)
      this.listings$=this.fetchRandomTenListingsByCategory(params.category);
      this.listings$.subscribe(item=>{
        var imagesarray=item.map(thing=>{
          var imagesarray=thing.images.split(',')
          thing.images=imagesarray[0]
          if(thing.price){
            thing.price=Number(thing.price)
            thing.price=thing.price.toFixed(2)
          }
          return thing
        })
        this.listings=item.filter(list=>list.title!=="test")
        this.listings=this.listings.filter(list=>list.title!=="Test")
    })
    }else{
      this.listings$=this.fetchRandomTenListings();
      this.listings$.subscribe(item=>{
        var imagesarray=item.map(thing=>{
          var imagesarray=thing.images.split(',')
          thing.images=imagesarray[0]
          if(thing.price){
            thing.price=Number(thing.price)
            thing.price=thing.price.toFixed(2)
          }
          return thing
        })
        this.listings=item.filter(list=>list.title!=="test")
        this.listings=this.listings.filter(list=>list.title!=="Test")
    })
    }
    })
  }


  fetchRandomTenListingsByCategory(category:string): Observable<Listing[]> {
    console.log("CATEGORY",category)
    return this.coopShopService.fetchRandomTenListingsByCategory(category)
  }

  fetchRandomTenListings(): Observable<Listing[]> {
    return this.coopShopService.fetchRandomTenListings()
  }
}

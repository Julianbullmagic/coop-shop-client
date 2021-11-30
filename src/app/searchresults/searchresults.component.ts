import { Component, OnInit,Input } from '@angular/core';
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { Store } from "src/app/models/Store";
import { Listing } from "src/app/models/Listing";
import { Observable } from "rxjs";

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {
 public stores$: Observable<Store[]>;
 public listings$: Observable<any[]>;
 public storeids$: Observable<any[]>;
 public storeids=[]
 public listingspage
 public storespage
 public stores=[]
 public listings=[]
 public pages:number;
 public pagesarray=[];
 public page:number=1;
 @Input() storepage: boolean;
 public view=false
  constructor(public router:Router,private route: ActivatedRoute,
  public coopShopService: CoopShopService) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {

    if(!this.storepage){
      if (params.searchTerm&&params.storeOrListing=="store"){
        if(params.category){
          this.stores$ = this.coopShopService.searchStoresByCategory(params.searchTerm,params.category)
        }else{
          this.stores$ = this.coopShopService.searchStores(params.searchTerm)
        }
        this.view=true
        this.stores$.subscribe(item=>{
          this.pages=Math.ceil(item.length/20)
          let x=1
          this.pagesarray=[]
          while(x<=this.pages){
            this.pagesarray.push(x)
            x++
          }
          console.log(this.pagesarray)
          console.log(this.pages)
          let pagesend=20*this.page
          let pagesbegin=pagesend-20
          this.stores=item
          this.storespage=item.slice(pagesbegin,pagesend)
        })
      }


      if (params.searchTerm&&params.storeOrListing=="listing"){
        if(params.category){
          this.listings$=this.coopShopService.searchListingsByCategory(params.searchTerm,params.category)
        }else{
          this.listings$ = this.coopShopService.searchListings(params.searchTerm)
        }

        this.listings$.subscribe(item=>{
          this.pages=Math.ceil(item.length/20)
          let x=1
          this.pagesarray=[]
          while(x<=this.pages){
            this.pagesarray.push(x)
            x++
          }

          var imagesarray=item.map(thing=>{
            thing.price=Number(thing.price)
            // thing.price=thing.price.toFixed(2)
            let imagesarray=thing.images.split(',')
            thing.images=imagesarray[0]
            return thing
          })
          let pagesend=20*this.page
          let pagesbegin=pagesend-20
          this.listingspage=imagesarray.slice(pagesbegin,pagesend)
          this.listings=imagesarray
          console.log("listings!!!",this.listings)
      })
      this.view=true
      }
    }

    if(this.storepage){
      if (params.searchTerm){

        if(params.category){
          this.listings$=this.coopShopService.searchListingsByShopCategory(params.searchTerm,params.id,params.category)
        }else{
          this.listings$=this.coopShopService.searchListingsByShop(params.searchTerm,params.id)
        }

        this.listings$.subscribe(item=>{
          this.pages=Math.ceil(item.length/20)
          let x=1
          this.pagesarray=[]
          while(x<=this.pages){
            this.pagesarray.push(x)
            x++
          }

          var imagesarray=item.map(thing=>{
            thing.price=Number(thing.price)
            let imagesarray=thing.images.split(',')
            thing.images=imagesarray[0]
            return thing
          })
          let pagesend=20*this.page
          let pagesbegin=pagesend-20
          this.listingspage=imagesarray.slice(pagesbegin,pagesend)
          this.listings=imagesarray
          console.log("listings!!!",this.listings)
      })
      this.view=true
      }
    }





    })


  }

  changepage(page){
      this.page=page
      console.log(this.page)
      let pagesend=20*this.page
      let pagesbegin=pagesend-20
      this.listingspage=this.listings.slice(pagesbegin,pagesend)
      this.storespage=this.stores.slice(pagesbegin,pagesend)
}
}

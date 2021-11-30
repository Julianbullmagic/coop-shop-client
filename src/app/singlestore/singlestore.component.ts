import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Listing } from "src/app/models/Listing";
import { Observable } from "rxjs";
import { Store } from "src/app/models/Store";

@Component({
  selector: 'app-singlestore',
  templateUrl: './singlestore.component.html',
  styleUrls: ['./singlestore.component.scss']
})
export class SinglestoreComponent implements OnInit {
  public listingsforshop$: Observable<any[]>;
  public stores$: Observable<Store[]>;
  public identity;
  public view=true
  public store
  public listings=[]
  public categories$:Observable<any[]>;
  public categories=[]
  public allcategories=[]
  @Input() storepage: boolean;
  viewdesc=true
  constructor(public router:Router,private route: ActivatedRoute,
  public coopShopService: CoopShopService) { }


  ngOnInit(): void {
    this.categories$=this.fetchCategories();
    this.categories$.subscribe(item=>{
      item=item.filter(x => !!x.category);
      this.allcategories=item
      this.categories=item.slice(0,10)})

    console.log(this.route.snapshot.paramMap.get('id'))
    let id=this.route.snapshot.paramMap.get('id')
    this.identity=Number(id)
    console.log("identity",this.identity)
    this.getStore()
    this.route.params.subscribe(params => {
      console.log("params",params)
    if(params.searchTerm){
      this.view=false
    }
    if(params.category){
      console.log("CATEGORY",params.category)

    this.listingsforshop$=this.fetchRandomTenListingsFromShopByCategory(this.identity,params.category);
    this.listingsforshop$.subscribe(item=>{
    var imagesarray=item.map(thing=>{
      thing.images=thing.images.split(',')[0]
      return thing
    })
    console.log(imagesarray)
    this.listings=item
    console.log(item)
  })
  }else{
this.getListings()
  }
  })
  }

  toggledetails(){
    this.viewdesc=!this.viewdesc
  }

  fetchCategories(): Observable<any[]> {
    return this.coopShopService.fetchAllCategories()
  }

  toggleallcategories(){
    console.log("clicking",this.allcategories)
    if(this.categories.length==10){
      this.categories=this.allcategories
    }else{
      this.categories=this.categories.slice(0,10)
    }
  }

getStore(){

  this.stores$=this.fetchStore(this.identity)
  this.stores$.subscribe(store=>{
    this.store=store[0]
    console.log("store",this.store)
  })
}

getListings(){
  this.listingsforshop$=this.fetchRandomTenListingsFromShop(this.identity);
  this.listingsforshop$.subscribe(item=>{
  var imagesarray=item.map(thing=>{
    thing.images=thing.images.split(',')[0]
    return thing
  })
  console.log(imagesarray)
  this.listings=item
  console.log(item)
})
}


  fetchRandomTenListingsFromShop(id:number): Observable<Listing[]> {
    return this.coopShopService.fetchRandomTenListingsFromShop(id)
  }

  fetchRandomTenListingsFromShopByCategory(id:number,category:string): Observable<Listing[]> {
    return this.coopShopService.fetchRandomTenListingsFromShopByCategory(id,category)
  }
  fetchStore(id:number): Observable<Store[]> {
    return this.coopShopService.fetchStore(id)
  }


}

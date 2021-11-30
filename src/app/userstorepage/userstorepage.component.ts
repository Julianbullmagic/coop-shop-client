import { Component, OnInit } from '@angular/core';
import { Listing } from "src/app/models/Listing";
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from "rxjs";
import Axios from 'axios'
import { Store } from "src/app/models/Store";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-userstorepage',
  animations: [
  trigger('openClose', [
    state('open', style({
      height:'1100px',
      opacity: 1,
    })),
    state('closed', style({
      height: 0,
      opacity: 0,
      marginBottom:'0vh',
      padding:'0px'
    })),
    transition('open => closed', [
      animate('2s')
    ]),
    transition('closed => open', [
      animate('2s')
    ]),
  ]),
],
  templateUrl: './userstorepage.component.html',
  styleUrls: ['./userstorepage.component.scss']
})
export class UserstorepageComponent implements OnInit {

  constructor(private coopShopService: CoopShopService,public router:Router,private route: ActivatedRoute) { }
  isOpen = true;
  public stores$: Observable<any[]>;
  public store

   toggle() {
     this.isOpen = !this.isOpen;
   }
  newCat=false
  updatinglisting=false
  editingListing=false
  editingListingId
  updatedlistingid
  uploading=false
  public storeid
  public listings$: Observable<any[]>
  public listings=[]
  public alllistings=[]

  public categories$:Observable<any[]>;
  public categories=[]
  imageids=[]
  imageone
  imagetwo
  imagethree
  imagefour
  imagefive

  listingModel={
    id:0,
    storeid:'',
    title:'',
    description:'',
    price:0,
    tags:'',
    materials:'',
    condition:'',
    category:'',
    images:'',
    searchterm:''
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.categories$=this.fetchCategories();
    this.categories$.subscribe(item=>{
      item=item.filter(x => !!x.category);
      item=item.map(x => x.category);
      console.log("categories",this.categories)
      this.categories=item})


    this.route.params.subscribe(params => {
      console.log("params.storeId",params.storeid)
      this.storeid=Number(params.storeid)
    })
    this.stores$=this.fetchStore(this.storeid)
    this.stores$.subscribe(store=>{
      this.store=store[0]

      // if(store.status==401){
      //   localStorage.clear()
      // }
      console.log("store",this.store)
    })

    this.listings$=this.fetchListingsForShop(this.storeid);
    this.listings$.subscribe(item=>{
      console.log("listing",item)
      // if(item.status==401){
      //   localStorage.clear()
      // }
      let itemcleaned=item.map(thing=>{
        let imagesarray=thing.images.split(',')
        console.log("imagesarray",imagesarray)
        thing.images=imagesarray[0]
        return thing
      })
      this.alllistings=itemcleaned
      this.listings=itemcleaned
      console.log("listings",this.listings)
    },
    err => {
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
            localStorage.clear()
          this.router.navigate(['/login'])
        }
      }
    }

  )
  }

  fetchStore(id:number): Observable<Store[]> {
    return this.coopShopService.fetchStore(id)
  }

  onFileSelectedOne(event){
    console.log(event.target.files)
    this.imageone=event.target.files[0]
  }
  onFileSelectedTwo(event){
    console.log(event.target.files)
    this.imagetwo=event.target.files[0]
  }
  onFileSelectedThree(event){
    console.log(event.target.files)
    this.imagethree=event.target.files[0]
  }
  onFileSelectedFour(event){
    console.log(event.target.files)
    this.imagefour=event.target.files[0]
  }
  onFileSelectedFive(event){
    console.log(event.target.files)
    this.imagefive=event.target.files[0]
  }

  newCategory(){
    this.newCat=!this.newCat
    this.listingModel.category=''
  }

  fetchListingsForShop(storeid:number): Observable<Listing[]> {
    return this.coopShopService.fetchListingsForShop(storeid)
  }

  fetchCategories(): Observable<any[]> {
    return this.coopShopService.fetchAllCategories()
  }

  search(event){
    console.log("searching",this.listingModel.searchterm,this.alllistings)
    let listone=this.alllistings.filter(listing=>listing.title.toLowerCase().includes(this.listingModel.searchterm.toLowerCase()))
    let listtwo=this.alllistings.filter(listing=>listing.description.toLowerCase().includes(this.listingModel.searchterm.toLowerCase()))
    let listthree=this.alllistings.filter(listing=>listing.category.toLowerCase().includes(this.listingModel.searchterm.toLowerCase()))
    let listfour=this.alllistings.filter(listing=>listing.materials.toLowerCase().includes(this.listingModel.searchterm.toLowerCase()))
    this.listings=[...listone,...listtwo,...listthree,...listfour]
    if(this.listingModel.searchterm==''){
      this.listings=this.alllistings
    }
  }


  async onSubmit() {
    console.log(this.listingModel)
    this.uploading=true
    if(this.imageone){
      await this.uploadImg(this.imageone)
    }
    if(this.imagetwo){
      await this.uploadImg(this.imagetwo)
    }
    if(this.imagethree){
      await this.uploadImg(this.imagethree)
    }
    if(this.imagefour){
      await this.uploadImg(this.imagefour)
    }
    if(this.imagefive){
      await this.uploadImg(this.imagefive)
    }



    this.listingModel.images=this.imageids.join()
    this.listingModel.storeid=this.storeid
    console.log("this listingmodel",this.listingModel)
    console.log("this.editingListing",this.editingListing,this.editingListingId)

    if(this.editingListing){
      this.listingModel.id=this.editingListingId
      console.log("editing Listing!!!")
      let model=JSON.parse(JSON.stringify(this.listingModel))
      let listings=JSON.parse(JSON.stringify(this.listings))
      listings.reverse().push(model).reverse();
      this.listings=listings;
      await this.coopShopService.editListing(this.listingModel)
      .subscribe(
        response => {
          console.log('Success!', response)
          console.log("uploading LISTING!!!!!!!")
          let currentUrl = this.router.url;
          if(response.status==401){
            localStorage.clear()
          }
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);      },
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                  localStorage.clear()
                this.router.navigate(['/login'])
              }
            }
          }
      )
    }

    if(!this.editingListing){
      let model=JSON.parse(JSON.stringify(this.listingModel))
      let listings=JSON.parse(JSON.stringify(this.listings))
      listings.reverse().push(model).reverse();
      this.listings=listings;
      console.log("creating listing",model)
      await this.coopShopService.createListing(this.listingModel)
      .subscribe(
        response => {
          console.log('Success!', response)
          console.log("uploading LISTING!!!!!!!")
          let currentUrl = this.router.url;
          if(response.status==401){
            localStorage.clear()
          }
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
                localStorage.clear()
              this.router.navigate(['/login'])
            }
          }
        }
      )
    }

    this.isOpen=false

    this.uploading=false
    this.editingListing=false
    this.editingListingId=''
    this.listingModel.storeid=''
    this.listingModel.title=''
    this.listingModel.description=''
    this.listingModel.price=0
    this.listingModel.tags=''
    this.listingModel.materials=''
    this.listingModel.condition=''
    this.listingModel.category=''
  }

  async uploadImg(img){
    const formData = new FormData();
    formData.append('file', img);
    formData.append("upload_preset", "jvm6p9qv");
    await Axios.post("https://api.cloudinary.com/v1_1/julianbullmagic/image/upload",formData)
    .then(response => {
      console.log("cloudinary response",response)
      this.imageids.push(`https://res.cloudinary.com/julianbullmagic/image/upload/v1635122421/${response.data.public_id}.jpg`)
    })
  }

  deleteListing(event,listingid){
    console.log("LISTING DELETE",listingid)
    for (let listing of this.listings){
      if (listing.listingid==listingid){
        listing.deleting=true
      }
    }
  }

  areYouSure(event,listingid){
    console.log(listingid)
    this.listings=this.listings.filter(listing=>!(listing.listingid==listingid))
    return this.coopShopService.deleteListing(listingid)
  }
  dontDelete(event,listingid){
    console.log(listingid)
    for (let listing of this.listings){
      if (listing.listingid==listingid){
        listing.deleting=false
      }
    }
  }

  scrollToForm(){
    document.getElementById('form').scrollIntoView({ behavior: "smooth", block: "start" });
  }

  stopEditing(){
    this.editingListing=false
    this.editingListingId=''
    this.listingModel.storeid=''
    this.listingModel.title=''
    this.listingModel.description=''
    this.listingModel.price=0
    this.listingModel.tags=''
    this.listingModel.materials=''
    this.listingModel.condition=''
    this.listingModel.category=''
    this.isOpen = !this.isOpen;
  }

  editListing(listing){
    this.isOpen = !this.isOpen;
    document.getElementById('form').scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("listing",listing)
    this.editingListing=true
    this.editingListingId=listing.listingid
    this.listingModel.storeid=listing.storeid
    this.listingModel.title=listing.title
    this.listingModel.description=listing.description
    this.listingModel.price=listing.price
    this.listingModel.tags=listing.tags
    this.listingModel.materials=listing.materials
    this.listingModel.condition=listing.used
    this.listingModel.category=listing.category

  }
}

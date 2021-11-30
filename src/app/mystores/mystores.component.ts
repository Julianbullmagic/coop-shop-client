import { Component, OnInit } from '@angular/core';
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Store } from "src/app/models/Store";
import Axios from 'axios'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Router,ActivatedRoute } from '@angular/router'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-mystores',
  animations: [
  trigger('openClose', [
    state('open', style({
      height:'800px',
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
  templateUrl: './mystores.component.html',
  styleUrls: ['./mystores.component.scss']
})
export class MystoresComponent implements OnInit {

  constructor(public coopShopService: CoopShopService,public router:Router,private route: ActivatedRoute) { }
  public stores$: Observable<any[]>;
  public stores=[]
  public categories$:Observable<any[]>;
  public categories=[]

  isOpen = true;

   toggle() {
     this.isOpen = !this.isOpen;
   }

  editingStore=false
  editingStoreId=''
  newCat=false

  uploading=false
  image
  icon
  storeModel =
  {
    id:0,
    userid:0,
    name:'',
    title:'',
    email:'',
    phone:'',
    description:'',
    category:'',
    image:'',
    icon:''}

    topicHasError=false
    submitted = false
    errorMsg = '';


    ngOnInit(): void {
      window.scrollTo(0, 0);
      this.categories$=this.fetchCategories();
      this.categories$.subscribe(item=>{
        item=item.filter(x => !!x.category);
        item=item.map(x => x.category);
        console.log("categories",this.categories)
        this.categories=item})

      this.stores$=this.fetchMyStores();
      this.stores$.subscribe(item=>{

        console.log("STORES",item[0])
        this.stores=item[0]},
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

        fetchCategories(): Observable<any[]> {
          return this.coopShopService.fetchAllCategories()
        }

        fetchMyStores(): Observable<any[]> {
          return this.coopShopService.fetchMyStores()
        }

        deleteStore(event,storeid){
          console.log("STOREID DELETE",storeid)
          for (let store of this.stores){
            if (store.storeid==storeid){
              store.deleting=true
            }
          }

        }
        areYouSure(event,storeid){
          console.log(storeid)
          this.stores=this.stores.filter(store=>!(store.storeid==storeid))
          return this.coopShopService.deleteStore(storeid)
        }

        dontDelete(event,storeid){
          console.log(storeid)
          for (let store of this.stores){
            if (store.storeid==storeid){
              store.deleting=false
            }
          }
        }


        onFileSelectedImage(event){
          console.log(event.target.files)
          this.image=event.target.files[0]
        }
        onFileSelectedIcon(event){
          console.log(event.target.files)
          this.icon=event.target.files[0]
        }

        validateTopic(value) {
          if (value === 'default') {
            this.topicHasError = true;
          } else {
            this.topicHasError = false;
          }
        }

        async onSubmit() {
          this.uploading=true
          console.log(this.storeModel)
          if(this.image){
            const formData = new FormData();
            formData.append('file', this.image);
            formData.append("upload_preset", "jvm6p9qv");
            await Axios.post("https://api.cloudinary.com/v1_1/julianbullmagic/image/upload",formData)
            .then(response => {
              console.log("cloudinary response",response)
              this.storeModel.image=`https://res.cloudinary.com/julianbullmagic/image/upload/v1635122421/${response.data.public_id}.jpg`

            })}
            if(this.icon){
              const formData = new FormData();
              formData.append('file', this.icon);
              formData.append("upload_preset", "jvm6p9qv");
              await Axios.post("https://api.cloudinary.com/v1_1/julianbullmagic/image/upload",formData)
              .then(response => {
                console.log("cloudinary response",response)
                this.storeModel.icon=`https://res.cloudinary.com/julianbullmagic/image/upload/v1635122421/${response.data.public_id}.jpg`
              })  }

              this.storeModel.userid=Number(localStorage.getItem("userid"))

              console.log("this storemodel",this.storeModel)
              console.log("editing store",this.editingStore)
              if(this.editingStore){
                this.storeModel.id=Number(this.editingStoreId)
                console.log("editing Store!!!")
                let model=JSON.parse(JSON.stringify(this.storeModel))
                this.stores.push(model)
                await this.coopShopService.editStore(this.storeModel)
                .subscribe(
                  response =>{
                     console.log('Success!', response)
                     let currentUrl = this.router.url;

           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           this.router.onSameUrlNavigation = 'reload';
           this.router.navigate([currentUrl]),
           err => {
             if( err instanceof HttpErrorResponse ) {
               if (err.status === 401) {
                   localStorage.clear()
                 this.router.navigate(['/login'])
               }
             }
           }
                   }
                )
              }

              if(!this.editingStore){
                let model=JSON.parse(JSON.stringify(this.storeModel))
                this.stores.push(model)
                await this.coopShopService.createStore(this.storeModel)
                .subscribe(
                  response => {
                    console.log('Success!', response)
                    let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]),
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                  localStorage.clear()
                this.router.navigate(['/login'])
              }
            }
          }
                    }
                )
              }

              this.uploading=false
              this.isOpen=false
              this.editingStore=false
              }


              scrollToForm(){
                document.getElementById('form').scrollIntoView({ behavior: "smooth", block: "start" });
              }

              stopEditing(){
                this.isOpen = !this.isOpen;
                this.editingStore=false
                this.editingStoreId=''
                this.storeModel.name=''
                this.storeModel.title=''
                this.storeModel.description=''
                this.storeModel.category=''
              }
              newCategory(){
                this.newCat=!this.newCat
                this.storeModel.category=''
              }

              editStore(store){
                document.getElementById('form').scrollIntoView({ behavior: "smooth", block: "start" });
                console.log("store",store)
                this.isOpen = !this.isOpen;
                this.editingStore=true
                this.editingStoreId=store.storeid
                this.storeModel.name=store.name
                this.storeModel.title=store.title
                this.storeModel.description=store.description
                this.storeModel.category=store.category
              }

            }

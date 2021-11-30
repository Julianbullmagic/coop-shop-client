import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "src/app/models/Store";
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-storeviewer',
  templateUrl: './storeviewer.component.html',
  styleUrls: ['./storeviewer.component.scss']
})
export class StoreviewerComponent implements OnInit {
  public stores$: Observable<Store[]>;
  public stores=[]
  constructor(public coopShopService: CoopShopService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log("params",params)

    if(params.category){
      console.log("CATEGORY",params.category)
      this.stores$=this.fetchRandomTenStoresByCategory(params.category);
      this.stores$.subscribe(item=>{
        this.stores=item.filter(list=>list.title!=="Test")
        this.stores=item.filter(list=>list.title!=="test")

      })
    }else{
      this.stores$=this.fetchRandomTenStores();
      this.stores$.subscribe(item=>{this.stores=item})
    }
    })
  }

  fetchAll(): Observable<Store[]> {
    return this.coopShopService.fetchAll()
  }

  fetchRandomTenStores(): Observable<Store[]> {
    return this.coopShopService.fetchRandomTenStores()

  }

  fetchRandomTenStoresByCategory(category:string): Observable<Store[]> {
    console.log("CATEGORY",category)
    return this.coopShopService.fetchRandomTenStoresByCategory(category)
  }
}
